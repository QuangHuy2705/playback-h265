import BaseComponent from '../base/BaseComponent'

class VideoContainer extends BaseComponent {
  constructor(parent) {
    super(parent)
  }

  render() {
    const cp = document.createElement('div')
    cp.style.width = '100%'
    cp.style.height = '100%'
    cp.style.position = 'relative'
    cp.style.background = '#000'
    this.parent.appendChild(cp)
    this.element = cp
  }
}

export default VideoContainer
