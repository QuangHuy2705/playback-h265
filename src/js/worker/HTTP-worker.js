// import HTTPRequest from './HTTPRequest'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg/dist/ffmpeg.min.js'

// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
// self.HTTPRequest = new HTTPRequest()
// onmessage = function (event) {
//   let data = event.data
//   let type = data.type

//   switch (type) {
//     case 'getData':
//       console.log('get data')
//       break
//   }
// }

module.exports = function worker(self) {
  // self.HTTPRequest = new HTTPRequest()
  self.addEventListener('message', (event) => {
    let data = event.data
    let type = data.type
    switch (type) {
      case 'getData':
        console.log('get data')
        break
    }
  })
}
