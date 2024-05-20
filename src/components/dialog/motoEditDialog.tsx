import React, { useEffect } from 'react';
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
  const { register, setValue, watch, handleSubmit,reset, formState: { errors } } = useForm<Motorcycle>();

  useEffect(() => {
    if (motoData) {
      reset(motoData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motoData]);

  const handleSaveEdit = (data:Motorcycle) => {
      saveChanges(data); 
      handleClose();
  };
console.log(watch("maker"))
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Edit Motorcycle</DialogTitle>
      <DialogContent>
        <Container component="form" onSubmit={handleSubmit(handleSaveEdit)} id="moto-edit">
          <Stack direction="column" spacing={2} padding={2}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel color="secondary">Maker</InputLabel>
              <Select
                defaultValue={""}
                label="Make"
                {...register('maker', { required: 'Make is required' })}
                value={watch("maker")??""}
                
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
              {...register('model', { required: 'Model is required', minLength: { value: 1, message: 'Model must be at least 1 character long' }, maxLength: { value: 15, message: 'Model must be at most 15 characters long' } })}
            />
            {errors.model && <Alert severity="error">{errors.model.message}</Alert>}
            <TextField
              type="number"
              label="Year"
              color="secondary"
              {...register('year', {
                required: 'Year is required',
                min: { value: 1900, message: 'Year must be at least 1900' },
                max: { value: 2024, message: 'Year must be at most 2024' }
              })}
              error={!!errors.year}
              helperText={errors.year?.message}
              inputProps={{ min: 1900, max: 2024 }}
            />
            {errors.year && <Alert severity="error">{errors.year.message}</Alert>}
            <FormControl required component="fieldset">
              <FormLabel color="secondary" component="legend">Engine Type</FormLabel>
              <RadioGroup onChange={(e) => setValue("engine",e.target.value)}
                row
                aria-label="engine"
                value={watch("engine")??""}
              > 
                {engineTypes.map((engine) => (
                  <FormControlLabel
                    key={engine}
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
