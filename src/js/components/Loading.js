import BaseComponent from '../base/BaseComponent'

class Loading extends BaseComponent {
  constructor(parent) {
    super(parent)
  }

  render() {
    const cp = document.createElement('div')
    console.log(cp)
    cp.className = 'lds-dual-ring'
    cp.muted = true
    this.parent.getElement().appendChild(cp)
    this.element = cp
  }

  showLoad() {}

  hideLoad() {
    this.element.style.opacity = 0
  }
}

export default Loading
