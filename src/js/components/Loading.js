import BaseComponent from "../base/BaseComponent";

class Loading extends BaseComponent {
  constructor(parent) {
    super(parent);
  }

  render() {
    const cp = document.createElement("div");
    console.log(cp);
    cp.className = "lds-dual-ring";
    cp.muted = true;
    this.parent.getElement().appendChild(cp);
    const errorMessage = document.createElement("div");
    errorMessage.style.position = "absolute";
    errorMessage.style.top = "50%";
    errorMessage.style.left = "50%";
    errorMessage.style.transform = "translate(-50%, -50%)";
    errorMessage.innerHTML = "Something went wrong";
    errorMessage.style.opacity = 0;
    this.error = errorMessage;
    console.log(this);
    this.parent.getElement().appendChild(errorMessage);
    this.element = cp;
  }

  showLoad() {
    this.element.style.opacity = 1;
  }

  hideLoad() {
    this.element.style.opacity = 0;
  }

  showError() {
    console.log("SHOW ERROR", this);
    this.element.style.opacity = 0;
    this.error.style.opacity = 1;
  }
}

export default Loading;
