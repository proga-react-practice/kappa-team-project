import React, { useState } from 'react';
import { Motorcycle } from '../../types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Alert, TextField, FormControlLabel, Radio,FormControl, FormLabel,Select, SelectChangeEvent, Paper,Box,RadioGroup,Typography } from '@mui/material';

const initialMotorcycleState: Motorcycle = {
  id: 0,
  maker: '',
  model: '',
  year: 0,
  engine : '',
};

const makers = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati'];
const engineTypes = ['Petrol', 'Diesel', 'Electric'] 

interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;
}

export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const [motorcycle, setMotorcycle] = useState<Motorcycle>(initialMotorcycleState);
  const [indexCounter, setIndexCounter] = useState<number>(0); 

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    maker: '',
    model: '',
    year: '',
    engine: '',
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!motorcycle.maker) {
      newErrors.maker = 'Make is required';
      isValid = false;
    }
    if (!motorcycle.model) {
      newErrors.model = 'Model is required';
      isValid = false;
    }
    if (motorcycle.year <= 1900) {
      newErrors.year = 'Year must be greater than 1900';
      isValid = false;
    }
    if (!motorcycle.engine) {
      newErrors.engine = 'Engine type is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMotorcycle({ ...motorcycle, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setMotorcycle({ ...motorcycle, maker: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      addMotorcycle({ ...motorcycle, id: indexCounter }); // Додаємо новий мотоцикл з індексом
      setMotorcycle(initialMotorcycleState);
      setIndexCounter(indexCounter + 1); // Збільшуємо лічильник для наступного індексу
    }
  };
  const handleClear = () => {
    setMotorcycle(initialMotorcycleState);
    setErrors({});
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>

    <Paper sx={{ padding: 4 }}>
    <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
        <Typography variant='h4' sx={{ margin: 1, padding: 2 }}>Add Motorcycle</Typography>

        <FormControl sx={{ width: 300 }}>
          <InputLabel color="secondary">Make</InputLabel>
          <Select
            id="make"
            name="maker"
            label="Make"
            defaultValue=""
            value={motorcycle.maker}
            onChange={handleSelectChange}
            color="secondary"
          >
          <MenuItem value="">Select Maker</MenuItem>
                {makers.map((maker) => (
                  <MenuItem key={maker} value={maker}>
                    {maker}
                  </MenuItem>
            ))}
          </Select>
          {errors.maker && <Alert severity="error">{errors.maker}</Alert>}
        </FormControl>
          <TextField
            id="model"
            name="model"
            label="Model"
            color='secondary'
            value={motorcycle.model}
            onChange={handleChange}
          />
          {errors.model && <Alert severity="error">{errors.model}</Alert>}
          <TextField
            type="number"
            id="year"
            name="year"
            label="Year"
            value={motorcycle.year}
            onChange={handleChange}
            color='secondary'
            inputProps={{ min: 1900, max: 2024 }}
          />
          {errors.year && <Alert severity="error">{errors.year}</Alert>}

        <FormControl required component="fieldset">
                <FormLabel color="secondary" component="legend">Engine Type</FormLabel>
                <RadioGroup 
                    row
                    aria-label="engine" 
                    name="engine" 
                    value={motorcycle.engine} 
                    onChange={handleChange}>
                    {engineTypes.map((engine) => (
                      <FormControlLabel key={engine} value={engine} control={<Radio />} label={engine} />
                    ))}
                </RadioGroup>
          {errors.engine && <Alert severity="error">{errors.engine}</Alert>}
            </FormControl>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" type="submit" color='primary'>
              Submit
            </Button>
            <Button variant="contained" onClick={handleClear} startIcon={<ClearIcon />} color='secondary'>
              Clear
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
    </Box>

  );
}
