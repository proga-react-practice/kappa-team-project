import { Box, Typography, Stack } from '@mui/material';
import Countdown from 'react-countdown';

const ComingSoonPage = () => {
  const completionDate = new Date('2024-06-01T00:00:00');

  return (
    <Box sx={{
        bgcolor: "background.default",
        height: "100vh",
        overflowY: 'auto',
        color: "text.secondary",
    }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ my: 3, padding: 3 }}>
            <Box sx={{ flex: 1 }}>
      <Typography variant="h2" gutterBottom>
        Coming Soon
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our website is under construction. We'll be here soon with our new awesome site, subscribe to be notified.
      </Typography>
      <Box mt={4}>
        <Countdown date={completionDate} />
      </Box>
    </Box>
    </Stack>

    </Box>

  );
};

export default ComingSoonPage;
