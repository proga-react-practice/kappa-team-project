import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Stack, FormControlLabel, RadioGroup, Radio, FormLabel,Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EditIcon from '@mui/icons-material/Edit';
import { Motorcycle, engineTypes, makers } from '../../lib/types';
import { useForm } from 'react-hook-form';

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  setMotorcycles: (motorcycles: Motorcycle[]) => void;
}

export default function MotorcycleList({ motorcycles, setMotorcycles }: MotorcycleListProps) {
  const {
   register,    formState: { errors },  watch, } = useForm<Motorcycle>();
    
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editMotorcycle, setEditMotorcycle] = useState<Motorcycle | null>(null);

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
      {motorcycles.map((motorcycle, index) => (
        <Collapse key={index} in={true} unmountOnExit>
          <Card className="motorcycle-item"
                key={index}
                draggable={true}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                sx={{ marginBottom: 1, width: 250 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <TwoWheelerIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <IconButton color='error' onClick={() => deleteMotorcycle(index)}><DeleteIcon /></IconButton>
                  <IconButton color='warning' onClick={() => handleEditClick(index)}><EditIcon /></IconButton>
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
              <InputLabel color="secondary">Maker</InputLabel>
              <Select
                label="Make"
                value={editMotorcycle?.maker || ''}
                onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, maker: e.target.value as string })}
                color="secondary"
              >
                <MenuItem value="">Select Maker</MenuItem>
                {makers.map((maker) => (
                  <MenuItem key={maker} value={maker} {...register('maker', { required: 'Make is required' })}>
                  {maker}
                  </MenuItem>
                ))}
              </Select>
              {errors.maker && <Alert severity="error">{errors.maker.message}</Alert>}

            </FormControl>
            <TextField
              label="Model"
              color="secondary"
              value={editMotorcycle?.model || ''}
              {...register('model', { required: 'Model is required', minLength: { value: 1, message: 'Model must be at least 1 characters long' }, maxLength: { value: 15, message: 'Model must be at most 15 characters long' } })}

              onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, model: e.target.value })}
            />
            {errors.model && <Alert severity="error">{errors.model.message}</Alert>}


            <TextField
                type="number"
                label="Year"
                value={editMotorcycle?.year || ''}
                color="secondary"
                {...register('year', {
                  required: 'Year is required',
                  min: { value: 1900, message: 'Year must be greater than 1900' },
                  max: { value: new Date().getFullYear(), message: `Year must be less than ${new Date().getFullYear()}` },
                  pattern: { value: /^\d{4}$/, message: 'Year must be a 4 digit number' }
                })}
                error={errors.year !== undefined}
                helperText={errors.year?.message?.toString()}
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
              {engineTypes.map((engine) => (<FormControlLabel checked={engine == watch('engine')} {...register('engine', {required: 'Engine type is required'})} value={engine} control={<Radio />} label={engine} />))}

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
