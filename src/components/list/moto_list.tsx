import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Stack, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EditIcon from '@mui/icons-material/Edit';
import { Motorcycle, engineTypes, makers } from '../../lib/types';

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  setMotorcycles: (motorcycles: Motorcycle[]) => void;
}

export default function MotorcycleList({ motorcycles, setMotorcycles }: MotorcycleListProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editMotorcycle, setEditMotorcycle] = useState<Motorcycle | null>(null);

  const deleteMotorcycle = (index: number) => {
    const newMotorcycles = motorcycles.filter((_, i) => i !== index);
    setMotorcycles(newMotorcycles);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditMotorcycle(motorcycles[index]);
  };

  const handleEditClose = () => {
    setEditIndex(null);
    setEditMotorcycle(null);
  };

  const handleSaveEdit = () => {
    if (editMotorcycle) {
      const updatedMotorcycles = [...motorcycles];
      updatedMotorcycles[editIndex!] = editMotorcycle;
      setMotorcycles(updatedMotorcycles);
      handleEditClose();
    }
  };

  return (
    <Box sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: { xs: 200, md: 400 }, scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>
      {motorcycles.map((motorcycle, i) => (
        <Collapse key={i} in={true} unmountOnExit>
          <Card className="motorcycle-item" sx={{ marginBottom: 1, width: 250 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <TwoWheelerIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <IconButton color='error' onClick={() => deleteMotorcycle(i)}><DeleteIcon /></IconButton>
                  <IconButton color='warning' onClick={() => handleEditClick(i)}><EditIcon /></IconButton>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Maker:</strong> {motorcycle.maker}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Model:</strong> {motorcycle.model}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Year:</strong> {motorcycle.year}</Typography>
              <Typography variant="body1" sx={{ textAlign: 'left' }}><strong>Engine:</strong> {motorcycle.engine}</Typography>
            </CardContent>
          </Card>
        </Collapse>
      ))}
      <Dialog open={editIndex !== null} onClose={handleEditClose}>
        <DialogTitle>Edit Motorcycle</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2} padding={2}> 
            <FormControl sx={{ width: 300 }}>
              <InputLabel color="secondary">Make</InputLabel>
              <Select
                label="Make"
                value={editMotorcycle?.maker || ''}
                onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, maker: e.target.value as string })}
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
              label="Model"
              color="secondary"
              value={editMotorcycle?.model || ''}
              onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, model: e.target.value })}
            />
            <TextField
              type="number"
              label="Year"
              value={editMotorcycle?.year || ''}
              onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, year: parseInt(e.target.value) })}
              color="secondary"
              inputProps={{ min: 1900, max: 2024 }}
            />
            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">
                Engine Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="engine"
                value={editMotorcycle?.engine || ''}
                onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, engine: e.target.value })}
              >
                {engineTypes.map((engine) => (
                  <FormControlLabel key={engine} value={engine} control={<Radio />} label={engine} />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
