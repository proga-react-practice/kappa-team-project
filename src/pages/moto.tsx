import React from 'react';
import { Box, Container } from '@mui/material';
import MotorcycleForm from '../components/form/moto_form';
import MotorcycleList from '../components/list/moto_list';
import { useContext } from 'react';
import { MotoContext } from '../components/providers/motoProvider';

const MotoPage: React.FC = () => {
  const { addMotorcycle } = useContext(MotoContext);

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default',paddingTop:{ xs: 18, md: 2 } }} >
      <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center',  paddingTop: 3 }}>
        <Box sx={{  display: 'flex',  justifyContent: 'center', alignItems: 'center' ,}}>
          <MotorcycleForm addMotorcycle={addMotorcycle} />
        </Box>
        <Box sx={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2, overflowY: 'auto' }}>
          <MotorcycleList />
        </Box>
      </Container>
    </Box>
  );
};

export default MotoPage;
