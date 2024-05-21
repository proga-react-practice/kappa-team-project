import React, { useState } from 'react';
import { TextField, Button, Container, Grid,Card, Box } from '@mui/material';
// import './FeedbackForm.css';
import Image from '../images/image_processing20210817-11522-117f9o.gif';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  const handleReset = () => {
    setName('');
    setEmail('');
    setFeedback('');
    setNameError('');
    setEmailError('');
    setFeedbackError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', { name, email, feedback });
    handleReset();
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', padding:3 ,  scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}` }}>
      <Container maxWidth="sm" sx={{ display: 'flex',  alignItems: 'center', flexDirection: {xs: "column", md: "row"},padding: 3  }}>
        <Box  sx={{ width: {xs: "50%", md: "80%"}, height: {xs: "50%", md: "90%"},  }}   >
        <img
              src={Image}
              alt="presentation"
              style={{
                height: '100%',
                width: '100%',
              }}
            />      
          </Box>
            <Container component="form" >
              <TextField
                fullWidth
                variant="outlined"
                label="Your Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
                margin="normal"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Your Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                margin="normal"
              />
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                label="Feedback or Suggestions"
                placeholder="Enter your feedback or suggestions"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                error={!!feedbackError}
                helperText={feedbackError}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" >
                Submit
              </Button>
            </Container>
            </Container>
    </Box>
  );
};

export default FeedbackForm;
