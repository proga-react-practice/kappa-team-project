import { Car } from '../../lib/types'
import { carMakers } from '../../lib/constants'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm, SubmitHandler, FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useContext, useEffect } from 'react';
import { CarsContext } from '../providers/carsProvider';
import { LocaleContext } from '../providers/localeProvider';
import UploadIcon from '@mui/icons-material/Upload';

interface FormFieldsProps {
    register: UseFormRegister<Car>
    errors: FieldErrors
    watch: UseFormWatch<Car>
    setValue: UseFormSetValue<Car>
}

const emptyCar: Car = { maker: undefined, model: undefined, year: undefined, engine: undefined, favorite: false, image: undefined}

export function FormFields({register, errors, watch, setValue} : FormFieldsProps) {
    const { translation } = useContext(LocaleContext)
    const f = translation.form
    const e = translation.error
    const engineTypes = [f.petrol,f.diesel,f.electric]

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target === null) return
        if (e.target.files === null) return
        const img = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            setValue('image', e.target?.result as string)
        }
        reader.readAsDataURL(img)
    }

    useEffect(() => {
        register('image')
    }, [register])

    return (
        <>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadIcon />}
                    >
                    {f.upload_image}
                    <input
                        type="file" 
                        accept='image/*' 
                        onChange={uploadImage}
                        style={{
                            clip: 'rect(0 0 0 0)',
                            clipPath: 'inset(50%)',
                            height: 1,
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            whiteSpace: 'nowrap',
                            width: 1,
                          }} />
                </Button>
            </Box>
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
                label={f.model + "*"}
                {...register('model', {required: e.model_error, minLength: {value: 5, message: e.model_5ch_error}})}
                error={errors.model !== undefined}
                helperText={errors.model?.message?.toString()}
                fullWidth
            />
            <TextField
                sx={{marginY: 1}}
                label={f.year + "*"}
                {...register('year', {  required: e.year_error ,min: {value: 1900, message: e.year_error_1900}, max: {value: new Date().getFullYear(), message: `${e.year_less_error} ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: e.year_4num_error}})}
                error={errors.year !== undefined}
                helperText={errors.year?.message?.toString()}
                fullWidth
            />
            <FormControl error={errors.engine !== undefined} component="fieldset">
                <FormLabel component="legend">{f.engine_text + "*"}</FormLabel>
                <RadioGroup 
                    row
                    value={watch('engine') || ''}
                    aria-label="engine">
                    {engineTypes.map((engine, index) => (<FormControlLabel value={index} {...register('engine', {required: e.engine_error})} control={<Radio />} label={engine} />))}
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