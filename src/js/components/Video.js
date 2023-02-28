class VideoComponent {
  parent;
  element;
  constructor(parent) {
    this.parent = parent;
    this.render();
    console.log(this.get);
  }

  render() {
    const cp = document.createElement("video");
    console.log(cp);
    cp.muted = true;
    // cp.width = "100%";
    // cp.height = "100%";
    cp.style.width = "100%";
    cp.style.height = "auto";
    this.parent.getElement().appendChild(cp);
    this.element = cp;
  }

  onPause() {}

  onPlay() {}

  onSeek() {}

  getElement() {
    return this.element;
  }
}

export default VideoComponent;
