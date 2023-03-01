import BaseComponent from '../base/BaseComponent'

class VideoComponent extends BaseComponent {
  constructor(parent) {
    super(parent)
  }

  render() {
    const cp = document.createElement('video')
    console.log(cp)
    cp.muted = true
    // cp.width = "100%";
    // cp.height = "100%";
    cp.style.width = '100%'
    cp.style.height = 'auto'
    this.parent.getElement().appendChild(cp)
    this.element = cp
  }

  onPause() {}

  onPlay() {}

  onSeek() {}
}

export default VideoComponent
