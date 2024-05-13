import CarForm from '../components/form/carForm'
import { useState } from 'react'
import { Car } from '../lib/types'
import CarList from '../components/list/carList'
import CarEditDialog from '../components/dialog/carEditDialog'
import CarHistory from '../components/dialog/carsHistory'
import { Box, Container, Divider} from '@mui/material'

interface CarPageProps {
	cars: Car[]
	setCars: (cars: Car[]) => void
	revertCommit: (index: number) => void
	commitHistory: Car[][]
	commitIndex: number
}

function CarsPage({cars, setCars, revertCommit, commitHistory, commitIndex} : CarPageProps) {
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

export default CarsPage
