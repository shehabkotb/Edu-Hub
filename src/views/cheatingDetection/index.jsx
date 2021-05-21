import SpyLogic from './components/spyLogic'
import { Prompt } from 'react-router'
import './styles.css'

const CheatingDetection = () => {
  return (
    <div className="container-ch">
      <div className="camera">
        <SpyLogic />
      </div>
      <Prompt
        when={true}
        message="You cant leave during the exam {press CANCEL to return, press OK to reset your exam"
      />
    </div>
  )
}

export default CheatingDetection
