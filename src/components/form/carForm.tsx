import { Car, emptyCar, engineTypes, carMakers } from '../../lib/types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, SubmitHandler, FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useContext } from 'react';
import { CarsContext } from '../providers/carsProvider';

interface FormFieldsProps {
    register: UseFormRegister<Car>
    errors: FieldErrors
    watch: UseFormWatch<Car>
    setValue: UseFormSetValue<Car>
}

export function FormFields({register, errors, watch, setValue} : FormFieldsProps) {
    
    return (
        <>
            <TextField
                sx={{marginY: 1}}
                label='Maker'
                select
                fullWidth
                {...register('maker')}
                onChange={(e) => {setValue('maker', e.target.value)}}
                value={watch('maker') || ''}
                error={errors.maker !== undefined}
                
                helperText={errors.maker?.message?.toString()}>
                    <MenuItem value="">Select Maker</MenuItem>
                    {carMakers.map((maker) => (
                        <MenuItem value={maker}>{maker}</MenuItem>
                    ))}
            </TextField>
            <TextField
                sx={{marginY: 1}}
                label='Model'
                {...register('model', {required: 'Model is required', minLength: {value: 5, message: 'Model must be at least 5 characters long'}})}
                error={errors.model !== undefined}
                helperText={errors.model?.message?.toString()}
                fullWidth
            />
            <TextField
                sx={{marginY: 1}}
                label='Year'
                {...register('year', {required: 'Year is required', min: {value: 1900, message: 'Year must be greater than 1900'}, max: {value: new Date().getFullYear(), message: `Year must be less than ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: 'Year must be a 4 digit number'}})}
                error={errors.year !== undefined}
                helperText={errors.year?.message?.toString()}
                fullWidth
            />
            <FormControl error={errors.engine !== undefined} required component="fieldset">
                <FormLabel component="legend">Engine Type</FormLabel>
                <RadioGroup 
                    row
                    value={watch('engine') || ''}
                    aria-label="engine">
                    {engineTypes.map((engine) => (<FormControlLabel value={engine} {...register('engine', {required: 'Engine type is required'})} control={<Radio />} label={engine} />))}
                </RadioGroup>
                <FormHelperText>{errors.engine?.message?.toString()}</FormHelperText>
            </FormControl>
        </>
    )
}

export default function CarForm(){

    const { addCar } = useContext(CarsContext)

    const { register, handleSubmit: submit, formState, reset, watch, setValue } = useForm<Car>({defaultValues: emptyCar})
    const onSubmit: SubmitHandler<Car> = (data) => {
        addCar(data)
        reset()
    }
    

    const handleReset = () => {
        reset()
    }
    
    return (
        <form onSubmit={submit(onSubmit)}>
            <Card sx={{overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{margin: 1}}>Add Car</Typography>
                
                    
                        <FormFields register={register} errors={formState.errors} watch={watch} setValue={setValue} />

                        <ButtonGroup sx={{margin: 1}}>
                            <Button variant='outlined' onClick={handleReset}>Clear</Button>
                            <Button variant='contained' type='submit'>Add Car</Button>
                        </ButtonGroup>
                    
                </CardContent>
            </Card>
        </form>
    )
}