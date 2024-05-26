import { Motorcycle  } from '../../lib/types';
import { Button, Stack, Typography, Alert, TextField, FormControlLabel, Radio, FormControl, styled,FormLabel, Select,  Card, RadioGroup, MenuItem ,Box} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { useContext, useEffect, } from 'react'; 
import { useForm,  } from "react-hook-form";
import {  makers } from '../../lib/constants';
import { LocaleContext } from '../providers/localeProvider';
import UploadIcon from '@mui/icons-material/Upload';

const initialMotorcycleState: Motorcycle = {
  maker: '',
  model: '1999',
  year: 1999,
  engine: undefined,
  favorite: false,
  image: ''
};

interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;

}


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const {handleSubmit,  register,   reset,   formState: { errors },  watch, setValue} = useForm<Motorcycle>({ defaultValues: initialMotorcycleState });
  const { translation } = useContext(LocaleContext)
  const f = translation.form
  const m = translation.moto_form
  const e = translation.error

  const engineTypes = [f.petrol,f.diesel,f.electric] // Engine types


  const onSubmit = (data: Motorcycle) => {
    addMotorcycle({ ...data });
    reset();
  };
  const handleReset = () => {
    reset({});
  };
  useEffect(() => {
    console.log(watch());
  }, [watch]);



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
    <Card sx={{ overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <Typography variant='h4' sx={{ margin: 1, padding: 1 }}>{m.title} </Typography>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Typography sx={{mr: 2}} variant='body1'>{f.upload_image}</Typography>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadIcon />}
                    >
                    Upload file
                    <VisuallyHiddenInput 
                        type="file" 
                        accept='image/*' 
                        onChange={uploadImage} />
                </Button>
            </Box>
            <FormControl>
              <InputLabel htmlFor="make" color="secondary">{f.maker}</InputLabel>
              <Select
                id="make"
                label={f.maker}
                {...register('maker', { required: e.maker_error })}
                value={watch('maker') || ''}
                
                error={!!errors.maker}
                color="secondary"
              >
              <MenuItem value="">{f.select_maker}</MenuItem>
                {makers.map((maker) => (
                  <MenuItem key={maker} value={maker} {...register('maker', { required: e.maker_error  })} >
                    {maker}
                  </MenuItem>
                ))}
              </Select>
              
              {errors.maker && <Alert severity="error">{errors.maker.message}</Alert>}
            </FormControl>

            <TextField
              id="model"
              label={f.model}
              {...register('model', { required: e.model_error , minLength: { value: 2, message: e.model_2ch_error }, maxLength: { value: 15, message: e.model_15ch_error } })}
              error={errors.model !== undefined}
              helperText={errors.model?.message?.toString() }

            />

            <TextField
              type="number"
              id="year"
              label={f.year}
              {...register('year', {required: e.year_error , min: {value: 1900, message: e.year_error_1900}, max: {value: new Date().getFullYear(), message: `${e.year_less_error} ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: e.year_4num_error}})}
              error={errors.year !== undefined}
              helperText={errors.year?.message?.toString()}
            />

            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">{f.engine_text}</FormLabel>
              <RadioGroup row value={watch('engine') || ''} aria-label="engine">
                
              {engineTypes.map((engine, index) => (
                <FormControlLabel
                  key={index}
                  {...register('engine', { required: e.engine_error })}
                  value={index}
                  control={<Radio />}
                  label={engine}

                />
              ))}

            </RadioGroup>
            {errors.engine && <Alert severity="error">{errors.engine.message}</Alert>}


            </FormControl>

            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" type="submit" color='primary'>
                {m.submit}
              </Button>
              <Button variant="contained" onClick={handleReset} startIcon={<ClearIcon />} color='secondary'>
                {m.clear}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Card>
  );
}
