import BaseComponent from "../base/BaseComponent";

class ProgressBar extends BaseComponent {
  progress = null;
  seek = null;
  constructor(parent) {
    super(parent);
  }

  render() {
    const cp = document.createElement("div");
    console.log(cp);
    cp.muted = true;
    cp.defaultPlaybackRate = 1;
    // cp.width = "100%";
    // cp.height = "100%";
    // cp.style.width = "100%";
    cp.style.height = "auto";
    cp.style.maxHeight = "30px";
    this.parent.getElement().appendChild(cp);

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-bar";

    const progress = document.createElement("div");
    progress.className = "progress";
    console.log(progress);

    this.progress = progress;
    console.log(this);

    const seek = document.createElement("div");
    seek.className = "seek";
    this.seek = seek;

    progressContainer.appendChild(progress);
    progressContainer.appendChild(seek);

    cp.appendChild(progressContainer);
  }

  updateProgressBar() {
    console.log(this);
    return;
    let progress = 0;
    this.progress.style.width = `${50}%`;
    this.seek.style.left = `${50}%`;
    progress++;
    if (progress > 100) {
      // clearInterval(intervalId);
      // isPlaying = false;
      // playBtn.disabled = false;
      // pauseBtn.disabled = true;
    }
  }
}

export default ProgressBar;
