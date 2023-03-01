import BaseComponent from "../base/BaseComponent";

class MainContainer extends BaseComponent {
  constructor(parent) {
    super(parent);
  }

  render() {
    const cp = document.createElement("div");
    cp.style.width = "100%";
    cp.style.height = "100%";
    cp.style.position = "relative";
    cp.style.background = "#000";
    cp.style.display = "grid";
    cp.style["grid-template-rows"] = "1fr 30px";
    this.parent.getElement().appendChild(cp);
    this.element = cp;
  }
}

export default MainContainer;
