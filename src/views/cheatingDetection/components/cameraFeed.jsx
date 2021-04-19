import React, { Component } from 'react'

class CameraFeed extends Component {
  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label)
      this.setDevice(device)
    })
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const { deviceId } = device
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId }
    })
    this.videoPlayer.srcObject = stream
    this.videoPlayer.play()
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices()
    this.processDevices(cameras)
  }

  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = () => {
    const context = this.canvas.getContext('2d')
    context.drawImage(this.videoPlayer, 0, 0, 680, 360)
  }

  render() {
    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width="680"
            heigh="360"
          />
        </div>
        <button onClick={this.takePhoto}>Take photo!</button>
        <div className="c-camera-feed__stage">
          <canvas width="680" height="360" ref={(ref) => (this.canvas = ref)} />
        </div>
      </div>
    )
  }
}

export default CameraFeed