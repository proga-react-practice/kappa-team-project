import { IconButton, ThemeProvider, Button, Divider, AppBar, Toolbar, Box,Menu,MenuList,MenuItem } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';

import { Link, Outlet } from "react-router-dom"
import themes from "../themes"
import { useState, useContext } from "react"
import { LocaleContext } from "../components/providers/localeProvider";

import CarsProvider from "../components/providers/carsProvider";
import MotoProvider from "../components/providers/motoProvider";



export default function Layout() {
    const { changeLocale, translation } = useContext(LocaleContext)
    const t = translation.layout

    const [themeIndex, setThemeIndex] = useState(0)

    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    }
    
    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    }

    function changeTheme() {
		setThemeIndex((themeIndex + 1) % themes.length)
	}

    return (
        <ThemeProvider theme={themes[themeIndex].theme}>
            <AppBar sx ={{bgcolor: "background.default"}}>
                <Toolbar sx={{height: 'auto', width: 'auto', margin: 0,   justifyContent: "start", gap: 10,  display:{xs:'none', md:'flex'}}}>
                    <Link to="/"><IconButton sx={{color: 'primary.main'}}><HomeIcon/></IconButton></Link>
                    <Link to="cars"><Button startIcon={<DirectionsCarIcon/>} sx={{color: 'primary.main'}} href="vlad">{t.cars}</Button></Link>
                    <Link to="moto"><Button startIcon={<TwoWheelerIcon/>} sx={{color: 'primary.main'}} href="ira">{t.moto}</Button></Link>
                    <Link to="list"><Button startIcon={<ListIcon/>} sx={{color: 'primary.main'}} href="ira">{t.list}</Button></Link>
                    <Button sx={{color: 'primary.main', marginLeft: "auto"}} onClick={changeLocale}>{t.lang_name}</Button>
                    <IconButton sx={{color: 'primary.main'}} onClick={changeTheme}>{themes[themeIndex].icon}</IconButton>
                </Toolbar>
                <Box sx= {{display:{xs:'flex', md:'none'}, padding:3,  }}>
                    <IconButton edge="start" sx={{color: 'primary.main'}} onClick={handleOpenNavMenu}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Menu open={Boolean(anchorNav)}  onClose={handleCloseNavMenu} sx = {{display:{xs:'flex', md:'none'}}}>
                        <MenuList sx={{justifyContent: "left ", paddingX: 1,}}>
                            <MenuItem ><Link to="/"><IconButton size="large" sx={{color: 'primary.main'}}><HomeIcon/></IconButton></Link></MenuItem>
                            <MenuItem ><Link to="cars"><Button size="medium" startIcon={<DirectionsCarIcon />} sx={{color: 'primary.main'}} href="vlad"></Button></Link></MenuItem>
                            <MenuItem ><Link to="moto"><Button size="medium" startIcon={<TwoWheelerIcon/>} sx={{color: 'primary.main'}} href="ira"></Button></Link></MenuItem>
                        </MenuList>

                    </Menu>
                    <Button sx={{color: 'primary.main'}} onClick={changeLocale}>{t.lang_name}</Button>
                    <IconButton sx={{color: 'primary.main'}} onClick={changeTheme}>{themes[themeIndex].icon}</IconButton>

                </Box>
                <Divider />
                <CarsProvider>
                    <MotoProvider>
                        <Outlet />
                    </MotoProvider>
                </CarsProvider>
            </AppBar>
        </ThemeProvider>
    )
}