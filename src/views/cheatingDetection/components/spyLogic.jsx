import React, { useRef, useCallback, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { ReactMic } from '@cleandersonlobo/react-mic'
import { uploadFile } from 'react-s3'
import { useSelector } from 'react-redux'
import './../styles.css'
import cheatingService from '../../../services/cheatingService'
import ReactCountdownClock from 'react-countdown-clock'
import { useHistory } from 'react-router-dom'

const SpyLogic = ({examId="123456789"}) => {
  const history = useHistory()
  const webcamRef = useRef(null)
  const user = useSelector((state) => state.auth.user)
  const [cnt, setCnt] = useState(1)
  const [record, setRecord] = useState(false)
  /*
  const S3_BUCKET = '***REMOVED***'
  const REGION = '***REMOVED***'
  const ACCESS_KEY = '***REMOVED***'
  const SECRET_ACCESS_KEY = '***REMOVED***'
  */
 const S3_BUCKET = '***REMOVED***'
 const REGION = '***REMOVED***'
 const ACCESS_KEY = '***REMOVED***'
 const SECRET_ACCESS_KEY = '***REMOVED***'

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: user.name + ':' + user._id,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  const startRecording = () => {
    setRecord(true)
  }

  const stopRecording = () => {
    setRecord(false)
  }

  const eventHandler = () => {
    document.title = document.hidden ? window.close() : "DON'T go away"
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', eventHandler);
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('visibilitychange', eventHandler)
      stopRecording()
      history.goBack()
    }
  }, [history])

  const onStop = async (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob)
    const blob = await fetch(recordedBlob.blobURL).then((res) => res.blob())
    blob.name = 'recording.mp3'
    handleUpload(blob)
  }

  const capture = useCallback(async () => {
    if (cnt === 1) {
      startRecording()
    }
    setCnt(cnt + 1)
    const imageSrc = webcamRef.current.getScreenshot()
    const blob = await fetch(imageSrc).then((res) => res.blob())
    blob.name = cnt.toString() + '.jpeg'
    if (cnt === 5) {
      setCnt(1)
      stopRecording()
    }
    console.log(blob)
    handleUpload(blob)
    cheatingService.batchInc(examId)
  }, [webcamRef, cnt])

  //useEffect(setInterval(() => {capture()}, 2000), [webcamRef, cnt])

  useEffect(() => {
    let intervalId;

      intervalId = setInterval(() => {
        capture()
      }, 2000)

    return () => clearInterval(intervalId)
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
      {/*<button onClick={capture}>Capture</button>*/}
      <ReactMic
        record={record}
        className="sound-wave"
        mimeType="audio/mp3"
        onStop={onStop}
        echoCancellation={true}
        autoGainControl={true}
        noiseSuppression={true}
      />
      <ReactCountdownClock
        seconds={0.1 * 3600}
        color="#000"
        alpha={0.9}
        size={240}
        onComplete={() => {
          stopRecording()
          cheatingService.clear()
          document.removeEventListener('visibilitychange', eventHandler)
          window.close()
        }}
      />
    </div>
  )
}

export default SpyLogic
