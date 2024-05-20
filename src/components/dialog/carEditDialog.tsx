
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import { Car } from '../../lib/types';
import { FormFields } from '../form/carForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { CarsContext } from '../providers/carsProvider';

interface CarEditDialogProps {
    open: boolean
    handleClose: () => void
    editIndex: number | null
}

export default function CarEditDialog({open, handleClose, editIndex} : CarEditDialogProps){

    const { editCar, cars } = useContext(CarsContext)

    const carData = editIndex !== null ? cars[editIndex] : undefined

    const { register, handleSubmit: submit, formState, reset, watch, setValue } = useForm<Car>({defaultValues: carData})
    
    const onSubmit: SubmitHandler<Car> = (data) => {
        editCar(editIndex, data)
        console.log(data)
        handleClose()
    }

    const handleReset = () => reset(carData)

    useEffect(() => {
        reset(carData)
    }, [carData, reset])

    return (
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={submit(onSubmit)}>
                    <DialogTitle>Edit Car</DialogTitle>
                    <DialogContent>
                        <FormFields register={register} errors={formState.errors} watch={watch} setValue={setValue} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button type='submit'>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
    )
}