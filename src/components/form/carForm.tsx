import { Car, emptyCar, engineTypes } from '../../lib/types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, SubmitHandler, FieldErrors, UseFormRegister } from "react-hook-form";

interface CarFormProps { addCar: (car: Car) => void }

interface FormFieldsProps {
    register: UseFormRegister<Car>
    errors: FieldErrors
}

export function FormFields({register, errors} : FormFieldsProps) {

    return (
        <>
            <TextField
                sx={{marginY: 1}}
                label='Maker'
                select
                fullWidth
                {...register('maker', {required: 'Maker is required'})}
                error={errors.maker !== undefined}
                helperText={errors.maker?.message?.toString()}>
                    <MenuItem value="">Select Maker</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Ford">Ford</MenuItem>
            </TextField>
            <TextField
                sx={{marginY: 1}}
                label='Model'
                {...register('model', {required: 'Model is required', minLength: {value: 2, message: 'Model must be at least 2 characters long'}})}
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
                    {...register('engine', {required: 'Engine type is required'})}
                    aria-label="engine">
                    {engineTypes.map((engine) => (<FormControlLabel value={engine} control={<Radio />} label={engine} />))}
                </RadioGroup>
                <FormHelperText>{errors.engine?.message?.toString()}</FormHelperText>
            </FormControl>
        </>
    )
}

export default function CarForm({ addCar } : CarFormProps){

    const { register, handleSubmit: submit, formState, reset } = useForm<Car>({defaultValues: emptyCar})
    const onSubmit: SubmitHandler<Car> = (data) => {
        addCar(data)
        reset(emptyCar)
    }

    const handleReset = () => reset(emptyCar)
    
    return (
        <form onSubmit={submit(onSubmit)}>
            <Card sx={{overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{margin: 1}}>Add Car</Typography>
                
                    
                        <FormFields register={register} errors={formState.errors} />

                        <ButtonGroup sx={{margin: 1}}>
                            <Button variant='outlined' onClick={handleReset}>Clear</Button>
                            <Button variant='contained' type='submit'>Add Car</Button>
                        </ButtonGroup>
                    
                </CardContent>
            </Card>
        </form>
    )
}