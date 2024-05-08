import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Motorcycle } from '../../types';

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  setMotorcycles: (motorcycles: Motorcycle[]) => void;
}

export default function MotorcycleList({ motorcycles, setMotorcycles }: MotorcycleListProps) {
  
  const deleteMotorcycle = (index: number) => {
    const newMotorcycles = motorcycles.filter((_, i) => i !== index) 
      .map((motorcycle, i) =>  {return { ...motorcycle, id: i }}); // оновлюємо індекси для кожної картки
    setMotorcycles(newMotorcycles); }

  return (
    <Box sx={{  maxHeight: { xs: 200, md: 400 } }}>
      {motorcycles.map((motorcycle, i) => (
        <Collapse key={i} in={true} unmountOnExit>
          <Card className="motorcycle-item" sx={{ marginBottom: 1, width: 250 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <TwoWheelerIcon sx={{ color: 'primary.main' }} />
                <IconButton color='error' onClick={() => deleteMotorcycle(i)}><DeleteIcon /></IconButton>
              </Box>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Maker:</strong> {motorcycle.maker}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Model:</strong> {motorcycle.model}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Year:</strong> {motorcycle.year}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Engine:</strong> {motorcycle.engine}</Typography>
            </CardContent>
          </Card>
        </Collapse>
      ))}
    </Box>
  );
}
