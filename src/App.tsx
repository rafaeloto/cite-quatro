import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home/Home"
import Game from "./components/CiteQuatro/CiteQuatro"

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cite-4' element={<Game />} />
      </Routes>
    </>
  )
}

export default App
