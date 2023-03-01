/**
 * @desc:
 * @author: huyntq
 * @file: H265Player.js
 */
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { M3U8Parser } from "./toolkit/M3U8Parser";
import Utils from "./utils";
import {
  VideoComponent,
  VideoContainer,
  Loading,
  ProgressBar,
  MainContainer,
} from "./components";
// import { v4 as uuidv4 } from "uuid";

class H265Player {
  loading = false;
  loadingFfmpeg = true;
  error = null;
  el = null;
  worker = null;
  processURL = null;
  currentSegment = -1;
  segmentPool = [];
  ffmpeg = null;
  mainContainer = null;
  videoContainer = null;
  videoComponent = null;
  loadingComponent = null;
  progressBar = null;
  loadingNext = null;
  speed = 1;
  start = null;
  end = null;

  constructor(url, el, options) {
    this.processURL = url;
    this.el = el;
    this.initUI();
    this.initFFmpeg();
    this.registerEvents();

    // this.play();
  }

  async initFFmpeg() {
    this.ffmpeg = createFFmpeg({ log: true });
    await this.ffmpeg.load();
    this.getPlaylist();
  }

  initUI() {
    if (!this.el) {
      console.error("NO TARGET ELEMENT");
      return;
    }
    this.videoContainer = new VideoContainer(this.el);
    this.mainContainer = new MainContainer(this.videoContainer);
    this.videoComponent = new VideoComponent(this.mainContainer);
    this.progressBar = new ProgressBar(this.mainContainer);
    this.loadingComponent = new Loading(this.videoContainer);
  }

  appendNewSegment = () => {
    this.loadingNext = false;
    this.play(this.currentSegment + 1);
  };

  getPercentage = () => {
    const totalLength = this.videoComponent.getElement().duration;
    const percentageCompleted =
      (this.videoComponent.getElement().currentTime / totalLength) * 100;
    console.log(this);
    this.progressBar.updateProgressBar();
    if (percentageCompleted > 20 && !this.loadingNext) {
      this.loadingNext = true;
      this.loadNext();
    }
  };

  onUpdateSpeed = (speed) => {
    this.speed = speed;
    this.videoComponent.getElement().defaultPlaybackRate = speed;
  };

  async loadNext() {
    console.log("LOADING NEXT");
    if (this.currentSegment == this.segmentPool.length - 1) {
      return;
    }
    const fileName = this.segmentPool[this.currentSegment + 1]?.name;
    const outputFile = `${fileName}.mp4`;
    const nextFile = this.segmentPool[this.currentSegment + 1].name;
    this.ffmpeg.FS(
      "writeFile",
      nextFile,
      await Utils.fetchFile(this.segmentPool[this.currentSegment + 1].file)
    );
    await this.ffmpeg.run(
      "-i",
      fileName,
      "-c:v",
      "copy",
      "-c:a",
      "copy",
      `${outputFile}`
    );
    // await this.ffmpeg.FS("unlink", outputFile);
  }

  async play(idx) {
    if (idx == this.segmentPool.length - 1) {
      console.log("END OF LIST");

      return;
    }
    this.currentSegment = idx;
    this.loading = true;
    const fileName = this.segmentPool[idx].name;
    const outputFile = `${fileName}.mp4`;

    const data = this.ffmpeg.FS("readFile", outputFile);
    this.videoComponent.getElement().pause();
    this.videoComponent.getElement().src = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );
    this.videoComponent.getElement().play();
    this.loadingComponent.hideLoad();
    this.loading = false;
  }

  async getPlaylist() {
    console.log("GETTING M3U8: ", this.processURL);
    if (!this.processURL) {
      console.error("NO M3U8 file");
      return;
    }
    try {
      const data = await fetch(this.processURL, {
        method: "GET",
      });
      console.log(data);

      if (data.ok) {
        data.text().then((body) => {
          this.parsePlaylist(body);
        });
      } else {
        this.error = true;
        this.loadingComponent.showError();
        console.log("GETTING M3U8 ERROR: ", this.processURL);
      }
    } catch (err) {
      this.error = true;
      this.loadingComponent.showError();
      console.log("GETTING M3U8 ERROR: ", this.processURL);
    }
  }

  async parsePlaylist(source) {
    const data = new M3U8Parser(source);
    if (!data.segments || !data.segments.length) {
      console.error("SOME THING WENT WRONG");
      return;
    }
    let segments = data.segments;
    segments.forEach((item) => {
      item.start = Utils.msec2sec(item.start);
      item.end = Utils.msec2sec(item.end);
      item.duration = Utils.msec2sec(item.duration);
    });
    this.start = segments[0].start;
    this.end = segments[segments.length - 1].end;
    this.segmentPool = segments;
    await this.loadNext();
    this.play(0);
  }

  registerEvents() {
    this.videoComponent
      .getElement()
      .addEventListener("ended", this.appendNewSegment);

    this.videoComponent
      .getElement()
      .addEventListener("timeupdate", this.getPercentage);
  }

  destroyUI() {}

  cleanUpStorage() {}

  unregisterEvent() {
    this.videoComponent
      .getElement()
      .removeEventListener("ended", this.appendNewSegment);
    this.videoComponent
      .getElement()
      .removeEventListener("timeupdate", this.appendNewSegment);
  }

  destroy() {
    this.destroyUI();
    this.cleanUpStorage();
    this.unregisterEvent();
  }
}

export default H265Player;
