import { Box, Typography, Container } from '@mui/material'
import { LocaleContext } from '../components/providers/localeProvider'
import { useContext } from 'react'

export default function Home() {
    const { translation } = useContext(LocaleContext)
    const f = translation.page_home
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
                <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>{f.title}</Typography>
                <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>{f.message}</Typography>
                <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>{f.message1}</Typography>
                <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>{f.message2}</Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>{f.message3}</Typography>
            </Container>
        </Box>
    )
}
