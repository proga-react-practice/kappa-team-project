import { Box, Typography, Stack, Button } from '@mui/material';
import { LocaleContext } from '../components/providers/localeProvider';
import { useContext } from 'react';
import Footer from './footer';
import Image from "../images/d43c11d76c7db33af616426597e88833.gif";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { translation } = useContext(LocaleContext);
    const f = translation.page_home;
    const navigate = useNavigate();

    const handleButtonCarClick = () => {
        navigate('/cars');
    };
    const handleButtonMotoClick = () => {
        navigate('/moto');
    };
    return (
        <Box sx={{
            bgcolor: "background.default",
            height: "100vh",
            overflowY: 'auto',
            color: "text.secondary",
        }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ my: 3, padding: 3 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            color: 'neutral.veryDarkViolet',
                            mb: 1.5,
                            letterSpacing: -1,
                            lineHeight: 1,
                            fontWeight: 800,
                            fontSize: '2.35rem',
                        }}
                    >
                        {f.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            color: 'neutral.grayishViolet',
                            lineHeight: 1.73,
                            fontSize: '0.92rem',
                        }}
                    >
                        {f.message}  <br /> 
                    </Typography>
                    <Stack sx = {{direction : "column"}}>
                    <Button
                        variant='outlined'
                        onClick={handleButtonCarClick}
                        sx={{
                            borderRadius: 8,
                            p: 1.3,
                            mt: 2,
                            width: { xs: '100%', md: '40%' },
                            fontSize: '1rem',
                            fontWeight: 600,
                        }}
                    >
                       {f.btn_add_car}
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={handleButtonMotoClick}

                        sx={{
                            borderRadius: 8,
                            p: 1.3,
                            mt: 2,
                            width: { xs: '100%', md: '40%' },
                            fontSize: '1rem',
                            fontWeight: 600,
                        }}
                    >
                        {f.btn_add_moto}
                    </Button></Stack>
                </Box>
                <Box  sx={{ width: {xs: "100%", md: "50%"}, height: {xs: "100%", md: "70%"},  }}   >
        <img
              src={Image}
              alt="presentation"
              style={{
                height: '100%',
                width: '100%',
              }}
            />      
          </Box>
            </Stack>
            <Footer />
        </Box>
    );
}
