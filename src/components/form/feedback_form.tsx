import React, { useContext } from 'react';

import { TextField, Button, Container, Box, Rating ,Card} from '@mui/material';
import Image from '../../images/image_processing20210817-11522-117f9o.gif';
import { useForm } from 'react-hook-form';
import { LocaleContext } from '../providers/localeProvider';

const FeedbackForm = () => {
  const [value, setValue] = React.useState<number | null>(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { translation } = useContext(LocaleContext);
  const f = translation.feedback;
  const onSubmit = () => {
    console.log("form validation is successful");
  };

  return (
    <Card sx={{ overflowY: "auto",height: '100vh', width: '100vw', scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>

      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: { xs: "50%", md: "80%" }, height: { xs: "50%", md: "90%" } }}>
          <img
            src={Image}
            alt="presentation"
            style={{
              height: '100%',
              width: '100%',
              padding: "3px"
            }}
          />
        </Box>

        <Container component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '80%' },height: { xs: "50%", md: "90%" } , marginTop: { xs: 2, md: 0 } , overflowY: "auto",}}>
          <TextField
            fullWidth
            variant="outlined"
            label={f.name}
            placeholder={f.name_placeholder}
            margin="normal"
            {...register("name", { required:f.error_name})}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message?.toString() : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            label={f.email}
            placeholder={f.email_placeholder}
            margin="normal"
            {...register("email", {
              required: f.error_email,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: f.error_email
              }
            })}
            error={errors.email !== undefined}
            helperText={errors.email ? errors.email.message?.toString() : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            label={f.feedback_text}
            placeholder={f.feedback_placeholder}
            margin="normal"
            {...register("feedback", { required: f.error_feedback })}
            error={!!errors.feedback}
            helperText={errors.feedback ? errors.feedback.message?.toString() : ""}
          />
          <Rating
            size="large"
            name="simple-controlled"
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            sx={{ marginY: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            {f.submit}
          </Button>
        </Container>
      </Container>
    </Card>
  );
};

export default FeedbackForm;

