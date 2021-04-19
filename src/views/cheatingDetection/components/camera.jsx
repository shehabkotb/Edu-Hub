import React, { Component, useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 1080,
  height: 1920,
  facingMode: 'user'
}

const Camera = () => {
  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState('')

  const capture = useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot())
    console.log(imageSrc)
  }, [webcamRef])

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  )
}

export default Camera
