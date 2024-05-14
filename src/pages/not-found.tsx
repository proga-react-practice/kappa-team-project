import { Button, Typography, Box, Container } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
            <Box sx={{ 
                        padding: 5,
                        bgcolor: "background.default", 
                        color: "text.secondary",            
                        minHeight: "100vh",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "start",
                        alignItems: 'center'}}>
                <Container sx={{ maxWidth: '80vw' }}>
                    <Typography color="text.primary" variant="h3" component="h3" >
                        404 Page not found
                    </Typography>
                    <Typography >
                        Sorry, the page you are looking for could not be found or has been removed.
                    </Typography>
                    <Link to="/"><Button endIcon={<HomeIcon/>} variant="text" >Return To Home</Button></Link>
                </Container>
            </Box>
    );
};

export default NotFoundPage;