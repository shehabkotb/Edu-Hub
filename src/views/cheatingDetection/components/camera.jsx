import React, { Component, useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import { uploadFile } from 'react-s3'

const S3_BUCKET = '***REMOVED***'
const REGION = '***REMOVED***'
const ACCESS_KEY = ''
const SECRET_ACCESS_KEY = ''

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY
}


const Camera = () => {
  const webcamRef = useRef(null)

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }
  

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot()
    const blob = await fetch(imageSrc).then((res) => res.blob())
    console.log(blob)
    handleUpload(blob)
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
      <button onClick={capture}>Capture photo</button>
    </div>
  )
}

export default Camera
