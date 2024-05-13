import { Car, emptyCar, engineTypes } from '../../lib/types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, SubmitHandler, Controller, Control, FieldErrors } from "react-hook-form";

interface CarFormProps { addCar: (car: Car) => void }

interface FormFieldsProps {
    control: Control<Car>
    errors: FieldErrors
}

export function FormFields({control, errors} : FormFieldsProps) {

    return (
        <>
            <Controller
                name='maker'
                control={control}
                rules={{required: 'Maker is required'}}
                render={({field}) => (
                    <TextField
                        sx={{marginY: 1}}
                        label='Maker'
                        select
                        fullWidth
                        error={errors.maker !== undefined}
                        helperText={errors.maker?.message?.toString()}
                        {...field}>
                            <MenuItem value="">Select Maker</MenuItem>
                            <MenuItem value="Toyota">Toyota</MenuItem>
                            <MenuItem value="Honda">Honda</MenuItem>
                            <MenuItem value="Ford">Ford</MenuItem>
                    </TextField>
                )}
            />
            <Controller
                name='model'
                control={control}
                rules={{required: 'Model is required'}}
                render={({field}) => (
                    <TextField
                        sx={{marginY: 1}}
                        label='Model'
                        error={errors.model !== undefined}
                        helperText={errors.model?.message?.toString()}
                        fullWidth
                        {...field}
                    />
                )}
            />
            <Controller
                name='year'
                control={control}
                rules={{required: 'Year is required', min: {value: 1900, message: 'Year must be greater than 1900'}, max: {value: new Date().getFullYear(), message: `Year must be less than ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: 'Year must be a 4 digit number'}}}
                render={({field}) => (
                    <TextField
                        sx={{marginY: 1}}
                        label='Year'
                        error={errors.year !== undefined}
                        helperText={errors.year?.message?.toString()}
                        fullWidth
                        {...field}
                    />
                )}
            />
            <Controller
                name='engine'
                control={control}
                rules={{required: 'Engine Type is required'}}
                render={({field}) => (
                    <FormControl error={errors.engine !== undefined} required component="fieldset">
                        <FormLabel component="legend">Engine Type</FormLabel>
                        <RadioGroup 
                            row
                            aria-label="engine" 
                            {...field}>
                            {engineTypes.map((engine) => (<FormControlLabel value={engine} control={<Radio />} label={engine} />))}
                        </RadioGroup>
                        <FormHelperText>{errors.engine?.message?.toString()}</FormHelperText>
                    </FormControl>
                )}
            />
        </>
    )
}

export default function CarForm({ addCar } : CarFormProps){

    const { control, handleSubmit: submit, formState, reset } = useForm<Car>()
    const onSubmit: SubmitHandler<Car> = (data) => addCar(data)

    const handleReset = () => reset(emptyCar)
    
    return (
        <form onSubmit={submit(onSubmit)}>
            <Card sx={{overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{margin: 1}}>Add Car</Typography>
                
                    
                        <FormFields control={control} errors={formState.errors} />

                        <ButtonGroup sx={{margin: 1}}>
                            <Button variant='outlined' onClick={handleReset}>Clear</Button>
                            <Button variant='contained' type='submit'>Add Car</Button>
                        </ButtonGroup>
                    
                </CardContent>
            </Card>
        </form>
    )
}