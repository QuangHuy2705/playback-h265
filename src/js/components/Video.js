import BaseComponent from "../base/BaseComponent";

class VideoComponent extends BaseComponent {
  constructor(parent) {
    super(parent);
  }

  render() {
    const cp = document.createElement("video");
    console.log(cp);
    cp.muted = true;
    cp.defaultPlaybackRate = 16;
    cp.style.width = "100%";
    cp.style.height = "100%";
    // cp.style.width = "100%";
    // cp.style.height = "100%";
    cp.style.objectFit = "fill";
    this.parent.getElement().appendChild(cp);
    this.element = cp;
  }

  onPause() {}

  onPlay() {}

  onSeek() {}
}

export default VideoComponent;
