class VideoContainer {
  parent;
  element;
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  render() {
    const cp = document.createElement("div");
    cp.style.width = "100%";
    cp.style.height = "100%";
    cp.style.position = "relative";
    cp.style.background = "#000";
    this.parent.appendChild(cp);
    this.element = cp;
  }

  getElement() {
    return this.element;
  }
}

export default VideoContainer;
