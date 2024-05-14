import { Motorcycle, engineTypes, makers } from '../../lib/types';
import { Button, Stack, Typography, Alert, TextField, FormControlLabel, Radio, FormControl, FormLabel, Select, Paper, Card, RadioGroup, MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, } from 'react'; // Added useEffect import
import { useForm,  } from "react-hook-form";
const initialMotorcycleState: Motorcycle = {
  maker: '',
  model: '',
  year: '',
  engine: '',
};

interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;

}
export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const {
  handleSubmit,  register,   reset,   formState: { errors },  watch, } = useForm<Motorcycle>({ defaultValues: initialMotorcycleState });
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
  
  return (
    <Card sx={{ overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <Typography variant='h4' sx={{ margin: 1, padding: 1 }}>Add Motorcycle</Typography>

            <FormControl>
              <InputLabel htmlFor="make" color="secondary">Maker</InputLabel>
              <Select
                id="make"
                label="Make"
                {...register('maker', { required: 'Make is required' })}
                value={watch('maker') || ''}
                
                error={!!errors.maker}
                color="secondary"
              >
              <MenuItem value="">Select Maker</MenuItem>
                {makers.map((maker) => (
                  <MenuItem key={maker} value={maker} {...register('maker', { required: 'Make is required' })}>
                    {maker}
                  </MenuItem>
                ))}
              </Select>
              {errors.maker && <Alert severity="error">{errors.maker.message}</Alert>}
            </FormControl>

            <TextField
              id="model"
              label="Model"
              color='secondary'
              {...register('model', { required: 'Model is required', minLength: { value: 1, message: 'Model must be at least 1 characters long' }, maxLength: { value: 15, message: 'Model must be at most 15 characters long' } })}
            />
            {errors.model && <Alert severity="error">{errors.model.message}</Alert>}

            <TextField
              type="number"
              id="year"
              label="Year"
              {...register('year', {required: 'Year is required', min: {value: 1900, message: 'Year must be greater than 1900'}, max: {value: new Date().getFullYear(), message: `Year must be less than ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: 'Year must be a 4 digit number'}})}
              error={errors.year !== undefined}
              helperText={errors.year?.message?.toString()}
            />
            {errors.year && <Alert severity="error">{errors.year.message}</Alert>}

            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">Engine Type</FormLabel>
              <RadioGroup
                row
                aria-label="engine"
                >
                   {engineTypes.map((engine) => (<FormControlLabel checked={engine == watch('engine')} {...register('engine', {required: 'Engine type is required'})} value={engine} control={<Radio />} label={engine} />))}

              </RadioGroup>
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" type="submit" color='primary'>
                Submit
              </Button>
              <Button variant="contained" onClick={handleReset} startIcon={<ClearIcon />} color='secondary'>
                Clear
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Card>
  );
}
