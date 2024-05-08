import  { useState } from 'react';
import { Box, Stack, Pagination } from '@mui/material';

import MotorcycleForm from '../components/form/moto_form';
import MotorcycleList from '../components/list/moto_list';
import { Motorcycle } from '../lib/types';

interface MotoPageProps {
  Motorcycles: Motorcycle[];
  setMotorcycles: (Motorcycles: Motorcycle[]) => void;
}

function MotoPage({Motorcycles, setMotorcycles} : MotoPageProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, Motorcycles.length);

  const addMotorcycle = (motorcycle: Motorcycle) => {
    setMotorcycles([...Motorcycles, motorcycle]);
  };
  console.log(Motorcycles)
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
      className='moto-container'
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Box className="Motorcycle-form-add">
          <MotorcycleForm addMotorcycle={addMotorcycle} />
        </Box>
        <Box className="Motorcycle-form-list">
          <MotorcycleList
            motorcycles={Motorcycles.slice(startIndex, endIndex)}
            setMotorcycles={setMotorcycles}
          />
          {Motorcycles.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(Motorcycles.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="secondary"
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default MotoPage;
