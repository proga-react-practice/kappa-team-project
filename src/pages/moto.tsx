import { Box, Container } from '@mui/material';
import MotorcycleForm from '../components/form/moto_form';
import MotorcycleList from '../components/list/moto_list';
import { useContext } from 'react';
import { MotoContext } from '../components/providers/motoProvider';

function MotoPage() {
  const { addMotorcycle } = useContext(MotoContext);

  return (


		<Box sx={{ height: '80%', width: '100vw', display: 'flex', alignItems: 'center', bgcolor: 'background.default' ,}} >

    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center',  paddingTop: 3, }}>
          <MotorcycleForm addMotorcycle={addMotorcycle} />
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end',padding:2}}>
        
      <MotorcycleList />
      </Box>
    </Container>

</Box>
  );
}

export default MotoPage;
