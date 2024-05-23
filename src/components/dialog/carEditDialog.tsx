
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import { Car } from '../../lib/types';
import { FormFields } from '../form/carForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { CarsContext } from '../providers/carsProvider';
import { LocaleContext } from '../providers/localeProvider';

interface CarEditDialogProps {
    open: boolean
    handleClose: () => void
    editIndex: number | null
}

export default function CarEditDialog({open, handleClose, editIndex} : CarEditDialogProps){
    const { translation } = useContext(LocaleContext)
    const f = translation.form
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
                    <DialogTitle>{f.editcar}</DialogTitle>
                    <DialogContent>
                        <FormFields register={register} errors={formState.errors} watch={watch} setValue={setValue} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{f.cancel}</Button>
                        <Button onClick={handleReset}>{f.reset}</Button>
                        <Button type='submit'>{f.save}</Button>
                    </DialogActions>
                </form>
            </Dialog>
    )
}