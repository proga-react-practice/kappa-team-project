import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import Vlad from './pages/vlad/main'
import Ira from './pages/ira/App'

import './App.css'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="vlad" element={<Vlad />} />
            <Route path="ira" element={<Ira />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
