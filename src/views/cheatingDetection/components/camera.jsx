import React, { Component, useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import { ReactMic } from 'react-mic'
import { uploadFile } from 'react-s3'
import { useSelector, useDispatch } from 'react-redux'
import styles from './../styles.css'


const Camera = () => {
  const dispatch = useDispatch()
  const webcamRef = useRef(null)
  const user = useSelector((state) => state.auth.user)
  const [cnt, setCnt] = useState(1);
  const [record, setRecord] = useState(false)

  const S3_BUCKET = '***REMOVED***'
  const REGION = '***REMOVED***'
  const ACCESS_KEY = '***REMOVED***'
  const SECRET_ACCESS_KEY = '***REMOVED***'

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: user.name+":"+user._id,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  }

  const startRecording = () => {
    setRecord (true);
  }

  const stopRecording = () => {
    setRecord (false);
  }

  const onStop=(recordedBlob)=> {
    console.log('recordedBlob is: ', recordedBlob);
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }
  

  const capture = useCallback(async () => {
    setCnt(cnt + 1)
    const imageSrc = webcamRef.current.getScreenshot()
    const blob = await fetch(imageSrc).then((res) => res.blob())
    blob.name = cnt.toString() + '.jpeg'
    if (cnt === 5) {
      setCnt(1)
    }
    console.log(blob)
    handleUpload(blob)
  }, [webcamRef, cnt])

  return (
    <div className="container">
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
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
    </div>
  )
}

export default Camera
