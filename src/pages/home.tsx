import { Box, Typography } from '@mui/material'

export default function Home() {
    return (
        <Box sx={{bgcolor: "background.default", minHeight: "100vh", padding: 5, color: "text.secondary"}}>
            <Typography color="text.primary" variant="h3">Home</Typography>
            <Typography variant="h4">Welcome to the home page</Typography>
            <Typography variant="body2">This is a simple home page with no functionality</Typography>
        </Box>
    )
}