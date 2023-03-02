class BaseComponent {
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  getElement() {
    return this.element;
  }
}

export default BaseComponent;
