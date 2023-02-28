/**
 * @desc:
 * @author: huyntq
 * @file: H265Player.js
 */
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { M3U8Parser } from "./toolkit/M3U8Parser";
import Utils from "./utils";
import {
  VideoComponent,
  VideoContainer,
  Loading,
  ProgressBar,
} from "./components";
// import { v4 as uuidv4 } from "uuid";

class H265Player {
  loading = true;
  error = null;
  el = null;
  worker = null;
  processURL = null;
  currentSegment = null;
  segmentPool = [];
  ffmpeg = null;
  videoContainer = null;
  videoComponent = null;
  loadingComponent = null;
  progressBar = null;
  /**
   * H265Player is the class exposed to user
   * @constructs
   */
  constructor(url, el, options) {
    this.processURL = url;
    this.el = el;
    this.initUI();
    this.initFFmpeg();
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
    this.videoComponent = new VideoComponent(this.videoContainer);
    this.loadingComponent = new Loading(this.videoContainer);
    this.progressBar = new ProgressBar(this.videoContainer);
  }

  fetchFile = async (_data) => {
    let data = _data;
    if (typeof _data === "undefined") {
      return new Uint8Array();
    }

    if (typeof _data === "string") {
      /* From base64 format */
      if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data)) {
        data = atob(_data.split(",")[1])
          .split("")
          .map((c) => c.charCodeAt(0));
        /* From remote server/URL */
      } else {
        const res = await fetch(new URL(_data, import.meta.url).href);
        data = await res.arrayBuffer();
      }
      /* From Blob or File */
    } else if (_data instanceof File || _data instanceof Blob) {
      data = await readFromBlobOrFile(_data);
    }

    return new Uint8Array(data);
  };

  async loadNext() {
    if (this.currentSegment == this.segmentPool.length - 1) {
      return;
    }
    const nextFile = this.segmentPool[this.currentSegment + 1].name;
    // console.log("loadnext");
    // this.currentSegment++;
    // this.play(this.currentSegment);
    this.ffmpeg.FS(
      "writeFile",
      nextFile,
      await this.fetchFile(this.segmentPool[this.currentSegment + 1].file)
    );
  }

  async play(idx) {
    this.currentSegment = idx;
    this.loading = true;
    const fileName = this.segmentPool[idx].name;
    const outputFile = `${fileName}.mp4`;

    this.ffmpeg.FS(
      "writeFile",
      fileName,
      await this.fetchFile(this.segmentPool[idx].file)
    );

    // const fileExist = await this.ffmpeg.FS("access", outputFile);
    // console.log(fileExist);

    await this.ffmpeg.run(
      "-i",
      fileName,
      "-c:v",
      "copy",
      "-c:a",
      "copy",
      `${outputFile}`
    );

    const data = this.ffmpeg.FS("readFile", outputFile);
    console.log(this.videoComponent);
    this.videoComponent.getElement().pause();
    this.videoComponent.getElement().src = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4",
      })
    );
    this.videoComponent.getElement().play();
    this.loadingComponent.hideLoad();
    this.loading = false;
    await this.ffmpeg.FS("unlink", outputFile);
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
        console.log("GETTING M3U8 ERROR: ", this.processURL);
      }
    } catch (err) {
      this.error = true;

      console.log("GETTING M3U8 ERROR: ", this.processURL);
    }
  }

  parsePlaylist(source) {
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
    console.log(segments);
    this.segmentPool = segments;
    this.play(6);
    // this.setSourceData(Object.freeze(data));
    // this.segmentPool.addAll(data.segments);
  }

  destroyUI() {}

  cleanUpStorage() {}

  destroy() {}
}

export default H265Player;
