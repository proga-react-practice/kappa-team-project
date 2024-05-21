import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import CarsPage from './pages/cars'
import MotoPage from './pages/moto'
import NotFoundPage from './pages/not-found'

import './App.css'
import { VehicleList } from './pages/vehicleList'
import { locales, translations } from "./locales"
import LocaleProvider from "./components/providers/localeProvider"
import FeedbackForm from './components/form/feedback_form'


function App() {

	return (
		<LocaleProvider locales={locales} translations={translations}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="cars" element={<CarsPage />} />
						<Route path="moto" element={<MotoPage />} />
						<Route path="*" element={<NotFoundPage />} />
						<Route path="list" element={<VehicleList />} />
						<Route path="feedback" element={<FeedbackForm/>} />

					</Route>
				</Routes>
			</BrowserRouter>
		</LocaleProvider>
	)
}

export default App
