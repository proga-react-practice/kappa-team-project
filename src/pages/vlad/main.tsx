import CarForm from './components/carForm'
import { useState } from 'react'
import { Car } from './types'
import VCV from '../../lib/vcv'
import CarList from './components/carList'
import CarEditDialog from './components/carEditDialog'
import CarHistory from './components/carsHistory'
import { Box, Container, Divider} from '@mui/material'

function Vlad() {
	const { state : cars, 
			setValue : setCars, 
			revertTo : revertCommit, 
			history : commitHistory,
			index: commitIndex } = VCV<Car[]>([]) // Car array state
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [editIndex, setEditIndex] = useState<number | null>(null)

	function addCar(car: Car) { // Function to add a car to the list
		setCars([...cars, car])
	}

	function deleteCar(i: number) { // Function to delete a car from the list
		setCars(cars.filter((_, index) => index !== i))
	}
	
	function editCar(i: number | null, car: Car) { // Function to edit a car from the list
		if (i === null) return
		setCars(cars.map((c, index) => index === i ? car : c))
	}

	function handleEdit(i: number) { // Function to handle car edition
		setEditIndex(i)
		setEditDialogOpen(true)
	}

	return (
		<Box 
			sx={{height: '100vh', width: '100vw', alignContent: 'center', justifyContent: "center", bgcolor: 'background.default'}}
			className='cars-container'>
				<Container sx={{display: 'flex', maxHeight: '80vh', flexDirection: {xs: "column", md: "row"}, justifyContent: 'center'}}>
					<CarForm addCar={addCar} />
					{cars.length !== 0 && <Divider orientation='vertical' flexItem variant='middle' sx={{m: 2}} />}
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
						<CarHistory 
							currentIndex={commitIndex}
							history={commitHistory} 
							revertTo={revertCommit}/>
						<CarList cars={cars} deleteCar={deleteCar} editCar={handleEdit} />
					</Box>
				</Container>
				<CarEditDialog 
					open={editDialogOpen} 
					handleClose={() => setEditDialogOpen(false)} 
					editCar={(car) => editCar(editIndex, car)}
					carData={editIndex !== null ? cars[editIndex] : undefined}
				/>
		</Box>
	)
}

export default Vlad
