import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home/Home"
import CiteQuatro from "./components/CiteQuatro/CiteQuatro"
import ViraCopos from './components/ViraCopos/ViraCopos';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cite-4' element={<CiteQuatro />} />
        <Route path='/vira-copos' element={<ViraCopos />} />
      </Routes>
    </>
  )
}

export default App
