import React, { Component, useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'


const Camera = () => {
  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState('')

  const capture = useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot())
    console.log(imageSrc)
  }, [webcamRef])

  return (
    <div>
      <Webcam
        audio={false}
        width={240}
        height={240}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 240,
          height: 240,
          facingMode: 'user'
        }}
      />
      {/*<button onClick={capture}>Capture photo</button>*/}
    </div>
  )
}

export default Camera
