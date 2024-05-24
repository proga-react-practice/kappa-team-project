import React from 'react';
import { TextField, Button, Container, Box, Rating } from '@mui/material';
import Image from '../../images/image_processing20210817-11522-117f9o.gif';
import { useForm } from 'react-hook-form';

const FeedbackForm = () => {
  const [value, setValue] = React.useState<number | null>(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    console.log("form validation is successful");
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', padding: 3, bgcolor: "background.default", scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: "column", md: "row" }, padding: 3 }}>
        <Box sx={{ width: { xs: "50%", md: "80%" }, height: { xs: "50%", md: "90%" } }}>
          <img
            src={Image}
            alt="presentation"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </Box>
        <Container component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '80%' }, marginTop: { xs: 2, md: 0 } }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Your Name"
            placeholder="Enter your name"
            margin="normal"
            {...register("name", { required: "Please enter your name" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message?.toString() : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Your Email"
            placeholder="Enter your email"
            margin="normal"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email"
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
            label="Feedback or Suggestions"
            placeholder="Enter your feedback or suggestions"
            margin="normal"
            {...register("feedback", { required: "Please enter your feedback" })}
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
            Submit
          </Button>
        </Container>
      </Container>
    </Box>
  );
};

export default FeedbackForm;