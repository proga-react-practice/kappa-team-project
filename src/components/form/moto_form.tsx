import { Motorcycle } from '../../lib/types';
import { Button, Stack, Typography, TextField, FormControlLabel, Radio, FormControl, FormLabel, Select, Card, RadioGroup, MenuItem, Box, FormHelperText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { motoMakers } from '../../lib/constants';
import { LocaleContext } from '../providers/localeProvider';
import UploadIcon from '@mui/icons-material/Upload';

const initialMotorcycleState: Motorcycle = {
  maker: '',
  model: '',
  year: undefined,
  engine:undefined ,
  favorite: false,
  image: ''
};

interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;
}

export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const { handleSubmit, register, reset, formState: { errors }, watch, setValue } = useForm<Motorcycle>({ defaultValues: initialMotorcycleState });
  const { translation } = useContext(LocaleContext);
  const f = translation.form;
  const m = translation.moto_form;
  const e = translation.error;

  const engineTypes = [f.petrol, f.diesel, f.electric]; // Engine types

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
    if (e.target === null) return;
    if (e.target.files === null) return;
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setValue('image', e.target?.result as string);
    };
    reader.readAsDataURL(img);
  };

  useEffect(() => {
    register('image');
  }, [register]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ overflow: "visible", padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1, paddingX: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <Typography variant='h4' sx={{ padding: 1, textAlign: 'center' }}>{m.title}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              <FormControl error={!!errors.maker}>
                <InputLabel htmlFor="make">{f.maker}</InputLabel>
                <Select
                  id="make"
                  label={f.maker}
                  {...register('maker', { required: e.maker_error })}
                  value={watch('maker') || ''}
                >
                  <MenuItem value="">{f.select_maker}</MenuItem>
                  {motoMakers.map((maker) => (
                    <MenuItem key={maker} value={maker}>
                      {maker}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.maker?.message?.toString()}</FormHelperText>
              </FormControl>

              <TextField
                id="model"
                label={f.model}
                {...register('model', { required: e.model_error, minLength: { value: 2, message: e.model_2ch_error }, maxLength: { value: 15, message: e.model_15ch_error } })}
                error={errors.model !== undefined}
                helperText={errors.model?.message?.toString()}
              />

              <TextField
                type="number"
                id="year"
                label={f.year}
                {...register('year', { required: e.year_error, min: { value: 1900, message: e.year_error_1900 }, max: { value: new Date().getFullYear(), message: `${e.year_less_error} ${new Date().getFullYear()}` }, pattern: { value: /^\d{4}$/, message: e.year_4num_error } })}
                error={errors.year !== undefined}
                helperText={errors.year?.message?.toString()}
              />

              <FormControl required component="fieldset" error={errors.engine !== undefined}>
                <FormLabel component="legend">{f.engine_text}</FormLabel>
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
                <FormHelperText>{errors.engine?.message?.toString()}</FormHelperText>
              </FormControl>

              <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </Box>
  );
}
