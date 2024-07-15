import { Link } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  return (
    <Link to="/">
      <img src="/icons/left-arrow.png" alt="Voltar" className="back-button" />
    </Link>
  )
}

export default BackButton