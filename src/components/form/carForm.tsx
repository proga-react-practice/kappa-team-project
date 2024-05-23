import { Car, carMakers } from '../../lib/types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, SubmitHandler, FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useContext } from 'react';
import { CarsContext } from '../providers/carsProvider';
import { LocaleContext } from '../providers/localeProvider';

interface FormFieldsProps {
    register: UseFormRegister<Car>
    errors: FieldErrors
    watch: UseFormWatch<Car>
    setValue: UseFormSetValue<Car>
}

export const emptyCar: Car = { maker: undefined, model: undefined, year: undefined, engine: undefined, favorite: false }

export function FormFields({register, errors, watch, setValue} : FormFieldsProps) {
    const { translation } = useContext(LocaleContext)
    const f = translation.form
    const e = translation.error
    const engineTypes = [f.petrol,f.diesel,f.electric]

    return (
        <>
            <TextField
                sx={{marginY: 1}}
                label={f.maker}
                select
                fullWidth
                {...register('maker')}
                onChange={(e) => {setValue('maker', e.target.value)}}
                value={watch('maker') || ''}
                error={errors.maker !== undefined}
                
                helperText={errors.maker?.message?.toString()}>
                    <MenuItem value="">{f.select_maker}</MenuItem>
                    {carMakers.map((maker, i) => (
                        <MenuItem key={i} value={maker}>{maker}</MenuItem>
                    ))}
            </TextField>
            <TextField
                sx={{marginY: 1}}
                label={f.model}
                {...register('model', {required: e.model_error, minLength: {value: 5, message: e.model_5ch_error}})}
                error={errors.model !== undefined}
                helperText={errors.model?.message?.toString()}
                required
                fullWidth
            />
            <TextField
                sx={{marginY: 1}}
                label={f.year}
                {...register('year', {  required: e.year_error ,min: {value: 1900, message: e.year_error_1900}, max: {value: new Date().getFullYear(), message: `${e.year_less_error} ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: e.year_4num_error}})}
                error={errors.year !== undefined}
                helperText={errors.year?.message?.toString()}
                required
                fullWidth
            />
            <FormControl error={errors.engine !== undefined} required component="fieldset">
                <FormLabel component="legend">{f.engine_text}</FormLabel>
                <RadioGroup 
                    row
                    value={watch('engine') || ''}
                    aria-label="engine">
                    {engineTypes.map((engine) => (<FormControlLabel value={engine} {...register('engine', {required: e.e})} control={<Radio />} label={engine} />))}
                </RadioGroup>
                <FormHelperText>{errors.engine?.message?.toString()}</FormHelperText>
            </FormControl>
        </>
    )
}

export default function CarForm(){
    const { translation } = useContext(LocaleContext)
    const t = translation.car_form

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
                    <Typography variant='h4' sx={{margin: 1}}>{t.title}</Typography>
                
                    
                        <FormFields register={register} errors={formState.errors} watch={watch} setValue={setValue} />

                        <ButtonGroup sx={{margin: 1}}>
                            <Button variant='outlined' onClick={handleReset}>{t.clear}</Button>
                            <Button variant='contained' type='submit'>{t.submit}</Button>
                        </ButtonGroup>
                    
                </CardContent>
            </Card>
        </form>
    )
}