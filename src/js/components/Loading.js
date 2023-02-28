class Loading {
  parent;
  element;
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  render() {
    const cp = document.createElement("div");
    console.log(cp);
    cp.className = "lds-dual-ring";
    cp.muted = true;
    this.parent.getElement().appendChild(cp);
    this.element = cp;
  }

  showLoad() {}

  hideLoad() {
    this.element.style.opacity = 0;
  }

  getElement() {
    return this.element;
  }
}

export default Loading;
