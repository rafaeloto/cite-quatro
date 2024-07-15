
import { toggleFullScreen } from '../../../utils/fullscreen';
import './FullScreenButton.css';

const FullScreenButton = () => {
  return (
    <button className="full-screen-button" onClick={toggleFullScreen}>
      <img className="full-screen-icon" src='/icons/fullscreen.png' alt='Tela cheia' />
    </button>
  )
}

export default FullScreenButton