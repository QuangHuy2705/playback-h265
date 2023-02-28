class BaseComponent {
  element = null;
  parent = null;
  constructor(options = {}) {
    super(options);
    this.id = options.id || this.constructor.name;
    this.render();
  }

  getComponent() {
    return this.element;
  }

  render() {}
}

export default BaseComponent;
