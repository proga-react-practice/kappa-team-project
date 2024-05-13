import { useForm, Controller } from 'react-hook-form';
import { Motorcycle,engineTypes,makers } from '../../lib/types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Alert, TextField, FormControlLabel, Radio, FormControl, FormLabel, Select, Paper, Card, RadioGroup, Typography } from '@mui/material';

const initialMotorcycleState: Motorcycle = {
  maker: '',
  model: '',
  year: 1900,
  engine: '',
};


interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;
}



export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<Motorcycle>();

  const onSubmit = (data: Motorcycle) => {
    addMotorcycle({ ...data,  });
    reset(initialMotorcycleState);
  };

  return (
    <Card sx={{overflowY: "auto", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}>
      <Paper sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <Typography variant='h4' sx={{ margin: 1, padding: 2 }}>Add Motorcycle</Typography>

            <FormControl >
              <InputLabel color="secondary">Make</InputLabel>
              <Controller
                name="maker"
                control={control}
                defaultValue=""
                rules={{ required: 'Make is required' }}
                render={({ field }) => (
                  <Select
                    id="make"
                    label="Make"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    color="secondary"
                  >
                    <MenuItem value="">Select Maker</MenuItem>
                    {makers.map((maker) => (
                      <MenuItem key={maker} value={maker}>
                        {maker}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.maker && <Alert severity="error">{errors.maker.message}</Alert>}
            </FormControl>

            <Controller
              name="model"
              control={control}
              defaultValue=""
              rules={{ required: 'Model is required', minLength: { value: 1, message: 'Model must be at least 1 characters long' }, maxLength: { value: 15, message: 'Model must be at most 15 characters long' } }}
              render={({ field }) => (
                <TextField
                  id="model"
                  label="Model"
                  color='secondary'
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.model && <Alert severity="error">{errors.model.message}</Alert>}

            <Controller
              name="year"
              control={control}
              rules={{ required: 'Year is required', min: { value: 1900, message: 'Year must be greater than 1900' } }}
              render={({ field }) => (
                <TextField
                  type="number"
                  id="year"
                  label="Year"
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  color='secondary'
                  inputProps={{ min: 1900, max: 2024 }}
                />
              )}
            />
            {errors.year && <Alert severity="error">{errors.year.message}</Alert>}

            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">Engine Type</FormLabel>
              <Controller
                name="engine"
                control={control}
                defaultValue=""
                rules={{ required: 'Engine type is required' }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-label="engine"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    {engineTypes.map((engine) => (
                      <FormControlLabel key={engine} value={engine} control={<Radio />} label={engine} />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.engine && <Alert severity="error">{errors.engine.message}</Alert>}
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" type="submit" color='primary'>
                Submit
              </Button>
              <Button variant="contained" onClick={() => reset()} startIcon={<ClearIcon />} color='secondary'>
                Clear
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Card>
  );
}
