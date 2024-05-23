import React, {  } from 'react';
import { Box, Container } from '@mui/material';
import MotorcycleForm from '../components/form/moto_form';
import MotorcycleList from '../components/list/moto_list';

import { useContext } from 'react';
import { MotoContext } from '../components/providers/motoProvider';


const MotoPage: React.FC = () => {
  const {addMotorcycle} = useContext(MotoContext);



  return (
    <Box sx={{ height: '100vh', width: '100vw', alignContent: 'center', justifyContent: 'center', bgcolor: 'background.default' }} className='cars-container'>
      <Container sx={{ display: 'flex', maxHeight: '80vh', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>
        <MotorcycleForm addMotorcycle={addMotorcycle} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', padding: 2 }}>
          <MotorcycleList />
        </Box>
      </Container>

    </Box>
  );
};

export default MotoPage;
