// import BaseComponent from "../base/BaseComponent";

class ProgressBar {
  parent;
  element;
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  render() {
    console.log(this.parent);
  }
  getElement() {
    return this.element;
  }
}

export default ProgressBar;
