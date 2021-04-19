import CameraFeed from "./components/cameraFeed"
import Camera from './components/camera'
import ReactCountdownClock from 'react-countdown-clock'
import styles from './styles.css'

const cheatingDetection = () =>{
    
    document.addEventListener('visibilitychange', function () {
      document.title = document.hidden ? "I'm away" : "I'm here"
    })

    return (
      <div className="container">
        <div className="camera">
          <Camera />
          <ReactCountdownClock
            seconds={0.1 * 3600}
            color="#000"
            alpha={0.9}
            size={240}
            //onComplete={myCallback}
          />
        </div>
      </div>
    )
}

export default cheatingDetection