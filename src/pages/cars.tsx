import CarForm from '../components/form/carForm'
import { useState, useContext } from 'react'
import CarList from '../components/list/carList'
import CarEditDialog from '../components/dialog/carEditDialog'
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
		<Box sx={{ height: '80%', width: '100vw', display: 'flex', alignItems: 'center', bgcolor: 'background.default' ,}} >

				<Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center',  paddingTop: 3, }}>
					<CarForm />
					{cars.length !== 0 && <Divider orientation='vertical' flexItem variant='middle' sx={{m: 2}} />}
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
						
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
