
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import { Car } from '../../lib/types';
import { FormFields } from '../form/carForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

interface CarEditDialogProps {
    open: boolean
    handleClose: () => void
    editCar: (car: Car) => void
    carData?: Car
}

export default function CarEditDialog({editCar, carData, open, handleClose} : CarEditDialogProps){

    const { register, handleSubmit: submit, formState, reset, watch } = useForm<Car>({defaultValues: carData})
    
    const onSubmit: SubmitHandler<Car> = (data) => {
        editCar(data)
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
                        <FormFields register={register} errors={formState.errors} watch={watch} />
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