import Camera from './components/camera'
import ReactCountdownClock from 'react-countdown-clock'
import styles from './styles.css'
import { useHistory } from 'react-router-dom'


const CheatingDetection = () =>{

    document.addEventListener('visibilitychange', function () {
        document.title = document.hidden ? "I'm away" : 'EduHub'
    })
    const history = useHistory()

    return (
      <div className="container-ch">
        <div className="camera">
          <Camera />
          <ReactCountdownClock
            seconds={0.01 * 3600}
            color="#000"
            alpha={0.9}
            size={240}
            onComplete={() => history.push(`/app`)}
          />
        </div>
      </div>
    )
}

export default CheatingDetection