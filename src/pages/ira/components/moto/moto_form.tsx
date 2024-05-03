import React, { useState } from 'react';
import { Motorcycle } from '../../types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Alert, TextField, FormControl, Select, SelectChangeEvent, Paper,Box } from '@mui/material';

const initialMotorcycleState: Motorcycle = {
  id: 0,
  maker: '',
  model: '',
  year: 0,
};

const makers = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati'];

interface MotorcycleFormProps {
  addMotorcycle: (motorcycle: Motorcycle) => void;
}

export default function MotorcycleForm({ addMotorcycle }: MotorcycleFormProps) {
  const [motorcycle, setMotorcycle] = useState<Motorcycle>(initialMotorcycleState);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];
    if (!motorcycle.maker) {
      newErrors.push('Make is required');
    }
    if (!motorcycle.model) {
      newErrors.push('Model is required');
    }
    if (motorcycle.year <= 1900) {
      newErrors.push('Year must be greater than 1900');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
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
      addMotorcycle(motorcycle);
      setMotorcycle(initialMotorcycleState);
    }
  };

  const handleClear = () => {
    setMotorcycle(initialMotorcycleState);
    setErrors([]);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>

    <Paper sx={{ padding: 2 }}>
    <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
        <FormControl>
          <InputLabel>Make</InputLabel>
          <Select
            id="make"
            name="make"
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
        </FormControl>
          <TextField
            id="model"
            name="model"
            label="Model"
            color='secondary'
            value={motorcycle.model}
            onChange={handleChange}
          />
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
          {errors.map((error, index) => (
            <Alert key={index} severity="error" >
              {error}
            </Alert>
          ))}
          <Stack direction="row" spacing={2}>
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
