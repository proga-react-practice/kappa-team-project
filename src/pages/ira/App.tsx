import { useState } from 'react';
import { Box, Stack, Divider } from '@mui/material';

import MotorcycleForm from './components/moto/moto_form';
import MotorcycleList from './components/moto/moto_list';
import { Motorcycle } from './types';

import './App.css';

function Ira() {
  const [Motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  const addMotorcycle = (Motorcycle: Motorcycle) => {
    setMotorcycles([...Motorcycles, Motorcycle]);
  };

 
  


  return (
    <>
        <Box
          className="theme-toggle"
          sx={{ position: 'fixed', top: 10, left: 10 }}
        >
        </Box>

        <Stack direction="row" spacing={1}>
          <Box className="Motorcycle-form-add">
            <MotorcycleForm addMotorcycle={addMotorcycle} />
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box className="Motorcycle-form-list">
            <MotorcycleList
              motorcycles={Motorcycles}
              setMotorcycles={setMotorcycles}
            />
          </Box>
        </Stack>
    </>
  );
}

export default Ira;
