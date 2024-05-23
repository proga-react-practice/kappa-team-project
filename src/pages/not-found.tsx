import { Button, Typography, Box, Container } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useContext } from 'react';

import { LocaleContext } from "../components/providers/localeProvider";

const NotFoundPage = () => {
    const { translation } = useContext(LocaleContext)
    const f = translation.page_not_found
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
                        {f.title}
                    </Typography>
                    <Typography >
                        {f.message}
                    </Typography>
                    <Link to="/"><Button endIcon={<HomeIcon/>} variant="text" >{f.btn_return}</Button></Link>
                </Container>
            </Box>
    );
};

export default NotFoundPage;
