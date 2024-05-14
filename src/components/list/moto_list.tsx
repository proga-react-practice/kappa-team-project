import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EditIcon from '@mui/icons-material/Edit';
import { Motorcycle } from '../../lib/types';
import MotoEditDialog from '../dialog/motoEditDialog'; // Assuming the dialog component is in the same directory

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  setMotorcycles: (motorcycles: Motorcycle[]) => void;
}

export default function MotorcycleList({ motorcycles, setMotorcycles }: MotorcycleListProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  const handleSort = () => {
    const _motorcycles = [...motorcycles];
    const draggedItemContent = _motorcycles.splice(dragItem.current!, 1)[0];
    _motorcycles.splice(dragOverItem.current!, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMotorcycles(_motorcycles);
  };

  const deleteMotorcycle = (index: number) => {
    const newMotorcycles = motorcycles.filter((_, i) => i !== index);
    setMotorcycles(newMotorcycles);
  };

  const saveChanges = (editedMoto: Motorcycle) => {
    const newMotorcycles = [...motorcycles];
    newMotorcycles[editIndex!] = editedMoto;
    setMotorcycles(newMotorcycles);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditDialogOpen(true); 
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: { xs: 200, md: 400 },
        scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`,
      }}
    >
      {motorcycles.map((motorcycle, index) => (
        <Collapse key={index} in={true} unmountOnExit>
          <Card
            className="motorcycle-item"
            key={index}
            draggable={true}
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            sx={{ marginBottom: 1, width: 250 }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <TwoWheelerIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <IconButton color="error" onClick={() => deleteMotorcycle(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="warning" onClick={() => handleEditClick(index)}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <strong>Maker:</strong> {motorcycle.maker}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <strong>Model:</strong> {motorcycle.model}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <strong>Year:</strong> {motorcycle.year}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <strong>Engine:</strong> {motorcycle.engine}
              </Typography>
            </CardContent>
          </Card>
        </Collapse>
      ))}
      <MotoEditDialog
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        motoData={editIndex !== null ? motorcycles[editIndex] : undefined}
        saveChanges={saveChanges} 
      />
    </Box>
  );
}
