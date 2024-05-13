import { IconButton, ThemeProvider, Box, Button, Divider } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Link, Outlet } from "react-router-dom"
import themes from "../themes"
import { useState } from "react"


export default function Layout() {

    const [themeIndex, setThemeIndex] = useState(0)


    function changeTheme() {
		setThemeIndex((themeIndex + 1) % themes.length)
	}

    return (
        <ThemeProvider theme={themes[themeIndex].theme}>
            <Box>
                <Box sx={{height: 50, margin: 0, paddingX: 5, paddingY: 2, width: "auto", display: "flex", justifyContent: "start", gap: 10, bgcolor: "background.default"}}>
                    <Link to="/"><IconButton sx={{color: 'primary.main'}}><HomeIcon/></IconButton></Link>
                    <Link to="cars"><Button startIcon={<DirectionsCarIcon/>} sx={{color: 'primary.main'}} href="vlad">Cars</Button></Link>
                    <Link to="moto"><Button startIcon={<TwoWheelerIcon/>} sx={{color: 'primary.main'}} href="ira">Motorcycles</Button></Link>
                    <IconButton sx={{color: 'primary.main', marginLeft: "auto"}} onClick={changeTheme}>{themes[themeIndex].icon}</IconButton>
                </Box>
                <Divider />
                <Outlet />
            </Box>
        </ThemeProvider>
    )
}