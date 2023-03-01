import BaseComponent from '../base/BaseComponent'

class ProgressBar extends BaseComponent {
  constructor(parent) {
    super(parent)
  }

  render() {
    console.log(this.parent)
  }
}

export default ProgressBar
