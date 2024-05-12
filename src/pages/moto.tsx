import { Box, Container } from '@mui/material';
import MotorcycleForm from '../components/form/moto_form';
import MotorcycleList from '../components/list/moto_list';
import { Motorcycle } from '../lib/types';

interface MotoPageProps {
  Motorcycles: Motorcycle[];
  setMotorcycles: (Motorcycles: Motorcycle[]) => void;
}

function MotoPage({ Motorcycles, setMotorcycles }: MotoPageProps) {
  const addMotorcycle = (motorcycle: Motorcycle) => {
    setMotorcycles([...Motorcycles, motorcycle]);
  };

  return (
    <Box 
			sx={{height: '100vh', width: '100vw',overflowY: 'auto', overflowX: 'auto',alignContent: 'center', justifyContent: "center", bgcolor: 'background.default',}}>
     <Container sx={{display: 'flex', maxHeight: '80vh', flexDirection: {xs: "column", md: "row"}, justifyContent: 'center'}}>
        <Box className="Motorcycle-form-add" >
          <MotorcycleForm addMotorcycle={addMotorcycle} />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', padding: 2}}>
          <MotorcycleList motorcycles={Motorcycles} setMotorcycles={setMotorcycles} />
        </Box>
      </Container>
    </Box>
  );
}

export default MotoPage;
