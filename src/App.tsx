import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import CarsPage from './pages/cars'
import MotoPage from './pages/moto'
import NotFoundPage from './pages/not-found'

import './App.css'


function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="cars" element={<CarsPage />} />
					<Route path="moto" element={<MotoPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
