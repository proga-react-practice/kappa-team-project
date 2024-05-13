import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import CarsPage from './pages/cars'
import MotoPage from './pages/moto'
import NotFoundPage from './pages/not-found'

import { Car, Motorcycle } from './lib/types'
import VCV from './lib/vcv'
import { useState } from 'react'

import './App.css'

function App() {
	const { state : cars, 
		setValue : setCars, 
		revertTo : revertCommit, 
		history : commitHistory,
		index: commitIndex } = VCV<Car[]>([])

	const [Motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

	return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="cars" element={<CarsPage cars={cars} setCars={setCars} revertCommit={revertCommit} commitHistory={commitHistory} commitIndex={commitIndex} />} />
						<Route path="moto" element={<MotoPage Motorcycles={Motorcycles} setMotorcycles={setMotorcycles} />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
	)
}

export default App
