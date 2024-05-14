import { Box, Typography, Container } from '@mui/material'

export default function Home() {
    return (
        <Box sx={{
            bgcolor: "background.default",
            minHeight: "100vh",
            padding: 3,
            overflowY: 'auto', 
            color: "text.secondary",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "start",
            alignItems: 'center'
        }}>
            <Container sx={{ maxWidth: '80vw', height: '100vh' }}> 
                <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>Your own collection</Typography>
                <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>Our team is working on a web project for collecting vehicles. This project allows you to create collections of your own cars and motorcycles.</Typography>
                <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>Vladislav made a form for creating a car collection.</Typography>
                <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>Irina created a form to create a collection of motorcycles.</Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>To connect these two forms, we used the react-router-dom library.</Typography>
            </Container>
        </Box>
    )
}
