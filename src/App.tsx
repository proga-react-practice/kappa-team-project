import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import CarsPage from './pages/cars'
import MotoPage from './pages/moto'
import NotFoundPage from './pages/not-found'

import './App.css'
import { locales, translations } from "./locales"
import LocaleProvider from "./components/providers/localeProvider"
import FeedbackForm from './components/form/feedback_form'
import ComingSoonPage from './pages/coming_soon'
import VehiclePage from './pages/vehiclePage'
import ListPage from './pages/list'
import './App.css';

function App() {

	return (
		<LocaleProvider locales={locales} translations={translations} >
			<BrowserRouter >
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="cars" element={<CarsPage />} />
						<Route path="moto" element={<MotoPage />} />
						<Route path="*" element={<NotFoundPage />} />
						<Route path="feedback" element={<FeedbackForm/>} />
						<Route path="coomingsoon" element={<ComingSoonPage/>} />
						<Route path="vehicle/:id" element={<VehiclePage/>}/>
						<Route path="vehicles" element={<ListPage/>}/>

					</Route>
				</Routes>
			</BrowserRouter>
		</LocaleProvider>
	)
}

export default App
