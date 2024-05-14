import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Alert,
  Container
} from '@mui/material';
import { Motorcycle } from '../../lib/types';
import { engineTypes, makers } from '../../lib/constants';
import { useForm } from 'react-hook-form';

interface MotoEditDialogProps {
  open: boolean;
  handleClose: () => void;
  motoData?: Motorcycle;
  saveChanges: (editedMoto: Motorcycle) => void;
}

const MotoEditDialog: React.FC<MotoEditDialogProps> = ({ open, handleClose, motoData, saveChanges }) => {
  const [editMotorcycle, setEditMotorcycle] = useState<Motorcycle | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Motorcycle>();

  useEffect(() => {
    if (motoData) {
      setEditMotorcycle(motoData);
    }
  }, [motoData]);

  const handleSaveEdit = () => {
    if (editMotorcycle) {
      saveChanges(editMotorcycle); // Оновіть поточний список у батьківському компоненті
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Motorcycle</DialogTitle>
      <DialogContent>
        <Container component="form" onSubmit={handleSubmit(handleSaveEdit)} id="moto-edit">
          <Stack direction="column" spacing={2} padding={2}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel color="secondary">Maker</InputLabel>
              <Select
                label="Make"
                value={editMotorcycle?.maker || ''}
                {...register('maker', { required: 'Make is required' })}
                onChange={(e) => {
                  setEditMotorcycle({ ...editMotorcycle!, maker: e.target.value as string });
                }}
                color="secondary"
                error={!!errors.maker}
              >
                <MenuItem value="">Select Maker</MenuItem>
                {makers.map((maker) => (
                  <MenuItem key={maker} value={maker}>
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
              {...register('model', { required: 'Model is required', minLength: { value: 1, message: 'Model must be at least 1 character long' }, maxLength: { value: 15, message: 'Model must be at most 15 characters long' } })}
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
                min: { value: 1900, message: 'Year must be at least 1900' },
                max: { value: 2024, message: 'Year must be at most 2024' }
              })}
              onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, year: e.target.value })}
              error={!!errors.year}
              helperText={errors.year?.message}
              inputProps={{ min: 1900, max: 2024 }}
            />
            {errors.year && <Alert severity="error">{errors.year.message}</Alert>}
            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">Engine Type</FormLabel>
              <RadioGroup
                row
                aria-label="engine"
                value={editMotorcycle?.engine || ''}
                onChange={(e) => setEditMotorcycle({ ...editMotorcycle!, engine: e.target.value })}
              >
                {engineTypes.map((engine) => (
                  <FormControlLabel
                    key={engine}
                    checked={engine === editMotorcycle?.engine}
                    value={engine}
                    control={<Radio />}
                    label={engine}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="moto-edit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MotoEditDialog;
