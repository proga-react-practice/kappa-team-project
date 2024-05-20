import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EditIcon from '@mui/icons-material/Edit';
import MotoEditDialog from '../dialog/motoEditDialog'; // Assuming the dialog component is in the same directory

import { MotoContext } from '../providers/motoProvider';


export default function MotorcycleList() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { Motorcycles, setMotorcycles, deleteMotorcycle, saveChanges, favoriteMotorcycle } = useContext(MotoContext);

  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditDialogOpen(true); 
  };

  const handleSort = () => {
    const _motorcycles = [...Motorcycles];
    const draggedItemContent = _motorcycles.splice(dragItem.current!, 1)[0];
    _motorcycles.splice(dragOverItem.current!, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMotorcycles(_motorcycles);
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
      {Motorcycles.map((motorcycle, index) => (
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
                  <IconButton color='error' onClick={() => {favoriteMotorcycle(index)}}>
                    {motorcycle.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
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
        motoData={editIndex !== null ? Motorcycles[editIndex] : undefined}
        saveChanges={(data) => {saveChanges(data, editIndex!)}} 
      />
    </Box>
  );
}
