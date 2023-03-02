import BaseComponent from "../base/BaseComponent";

class ProgressBar extends BaseComponent {
  constructor(parent) {
    super(parent);
  }

  render() {
    const cp = document.createElement("div");
    console.log(cp);
    cp.muted = true;
    cp.defaultPlaybackRate = 1;
    cp.width = "100%";
    cp.height = "100%";
    cp.style.width = "100%";
    cp.style.height = "auto";
    cp.style.maxHeight = "30px";
    this.parent.getElement().appendChild(cp);
    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-bar";
    const progress = document.createElement("div");
    this.progress1 = progressContainer;
    progress.className = "progress";
    this.progress = progress;
    const seek = document.createElement("div");
    seek.className = "seek";
    this.seek = seek;
    progressContainer.appendChild(progress);
    progressContainer.appendChild(seek);
    cp.appendChild(progressContainer);
    this.element = progressContainer;
  }

  updateProgressBar(percent) {
    console.log(this.progress);
    this.progress.style.width = `${percent}%`;
  }
}

export default ProgressBar;
