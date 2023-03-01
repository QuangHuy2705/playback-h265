class BaseComponent {
  element = null
  parent = null
  constructor(parent) {
    this.parent = parent
    this.render()
  }

  getElement() {
    return this.element
  }

  render() {}
}

export default BaseComponent
