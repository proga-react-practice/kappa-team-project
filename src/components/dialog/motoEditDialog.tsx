import React, { useContext, useEffect } from 'react';
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
import {  motoMakers } from '../../lib/constants';
import { useForm } from 'react-hook-form';
import { LocaleContext } from '../providers/localeProvider';

interface MotoEditDialogProps {
  open: boolean;
  handleClose: () => void;
  motoData?: Motorcycle;
  saveChanges: (editedMoto: Motorcycle) => void;
}

const MotoEditDialog: React.FC<MotoEditDialogProps> = ({ open, handleClose, motoData, saveChanges }) => {
  const { register, setValue, watch, handleSubmit,reset, formState: { errors } } = useForm<Motorcycle>();
  const { translation } = useContext(LocaleContext)
  const f = translation.form
  const e = translation.error
  const engineTypes = [f.petrol,f.diesel,f.electric]
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
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>{f.editmoto}</DialogTitle>
      <DialogContent>
        <Container component="form" onSubmit={handleSubmit(handleSaveEdit)} id="moto-edit">
          <Stack direction="column" spacing={2} padding={2}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel color="secondary">{f.maker}</InputLabel>
              <Select
                defaultValue={""}
                label="Make"
                {...register('maker', { required: e.maker_error  })}
                value={watch("maker")??""}
                
                color="secondary"
                error={!!errors.maker}
              >
                <MenuItem value=""> {f.select_maker}</MenuItem>
                {motoMakers.map((maker) => (
                  <MenuItem key={maker} value={maker}>
                    {maker}
                  </MenuItem>
                ))}
              </Select>
              {errors.maker && <Alert severity="error">{errors.maker.message}</Alert>}
            </FormControl>
            <TextField
              label={f.model}
              color="secondary"
              {...register('model', { required: e.model_error , minLength: { value: 2, message: e.model_2ch_error }, maxLength: { value: 15, message: e.model_15ch_error } })}
              error={errors.model !== undefined}
              helperText={errors.model?.message?.toString() }
            />
            <TextField
              type="number"
              color="secondary"
              label={f.year}
              {...register('year', {required: e.year_error , min: {value: 1900, message: e.year_error_1900}, max: {value: new Date().getFullYear(), message: `${e.year_less_error} ${new Date().getFullYear()}`}, pattern: {value: /^\d{4}$/, message: e.year_4num_error}})}
              error={errors.year !== undefined}
              helperText={errors.year?.message}
              inputProps={{ min: 1900, max: 2024 }}
            />
            {errors.year && <Alert severity="error">{errors.year.message}</Alert>}
            <FormControl required component="fieldset">
            <FormLabel color="secondary" component="legend">{f.engine_text}</FormLabel>
              <RadioGroup onChange={(e) => setValue("engine",parseInt(e.target.value))}
                row
                aria-label="engine"
                value={watch("engine")??""}
              > 
                {engineTypes.map((engine, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
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
        <Button onClick={handleClose}>{f.cancel}</Button>
        <Button type="submit" form="moto-edit">{f.save}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MotoEditDialog;
