import CarForm from '../components/form/carForm'
import { useState, useContext } from 'react'
import CarList from '../components/list/carList'
import CarEditDialog from '../components/dialog/carEditDialog'
import CarHistory from '../components/dialog/carsHistory'
import { Box, Container, Divider} from '@mui/material'
import { CarsContext } from '../components/providers/carsProvider'

function CarsPage() {
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [editIndex, setEditIndex] = useState<number | null>(null)
	const { cars } = useContext(CarsContext)

	function handleEdit(i: number) { // Function to handle car edition
		setEditIndex(i)
		setEditDialogOpen(true)
	}

	return (
		<Box 
			sx={{height: '100vh', width: '100vw', alignContent: 'center', justifyContent: "center", bgcolor: 'background.default'}}
			className='cars-container'>
				<Container sx={{display: 'flex', maxHeight: '80vh', flexDirection: {xs: "column", md: "row"}, justifyContent: 'center'}}>
					<CarForm />
					{cars.length !== 0 && <Divider orientation='vertical' flexItem variant='middle' sx={{m: 2}} />}
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
						<CarHistory />
						<CarList handleEdit={handleEdit} />
					</Box>
				</Container>
				<CarEditDialog 
					open={editDialogOpen} 
					handleClose={() => setEditDialogOpen(false)} 
					editIndex={editIndex}
				/>
		</Box>
	)
}

export default CarsPage
