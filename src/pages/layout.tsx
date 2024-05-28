import { IconButton, ThemeProvider, Button, Divider, Toolbar, Box, Menu, MenuList, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';

import { Link, Outlet } from "react-router-dom";
import themes from "../themes";
import { useState, useContext } from "react";
import { LocaleContext } from "../components/providers/localeProvider";

import CarsProvider from "../components/providers/carsProvider";
import MotoProvider from "../components/providers/motoProvider";

export default function Layout() {
    const { changeLocale, translation } = useContext(LocaleContext);
    const t = translation.layout;

    const [themeIndex, setThemeIndex] = useState(localStorage.getItem('theme') ? parseInt(localStorage.getItem('theme') as string) : 0);

    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    function changeTheme() {
        setThemeIndex((themeIndex + 1) % themes.length);
        localStorage.setItem('theme', (themeIndex + 1) % themes.length + '');
    }

    return (
        <ThemeProvider theme={themes[themeIndex].theme}>
            <Toolbar sx={{ height: 'auto', width: 'auto', margin: 0, overflowY: "auto", justifyContent: "start", gap: 10, backgroundColor: "background.default", display: { xs: 'none', md: 'flex' } }}>
                <Link to="/"><IconButton sx={{ color: 'primary.main' }}><HomeIcon /></IconButton></Link>
                <Link to="cars"><Button startIcon={<DirectionsCarIcon />} sx={{ color: 'primary.main' }}>{t.cars}</Button></Link>
                <Link to="moto"><Button startIcon={<TwoWheelerIcon />} sx={{ color: 'primary.main' }}>{t.moto}</Button></Link>
                <Link to="vehicles"><Button startIcon={<ListIcon />} sx={{ color: 'primary.main' }}>{t.list}</Button></Link>
                <Button sx={{ color: 'primary.main', marginLeft: "auto" }} onClick={changeLocale}>{t.lang_name}</Button>
                <IconButton sx={{ color: 'primary.main' }} onClick={changeTheme}>{themes[themeIndex].icon}</IconButton>
            </Toolbar>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, padding: 3, backgroundColor: "background.default" }}>
                <IconButton edge="start" sx={{ color: 'primary.main' }} onClick={handleOpenNavMenu}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                <Menu
                    anchorEl={anchorNav}
                    open={Boolean(anchorNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', top: 0, left: 0 }}
                >
                    <MenuList sx={{ justifyContent: "left ", paddingX: 1 }}>
                        <MenuItem><Link to="/"><IconButton size="large" sx={{ color: 'primary.main' }}><HomeIcon /></IconButton></Link></MenuItem>
                        <MenuItem><Link to="cars"><Button size="medium" startIcon={<DirectionsCarIcon />} sx={{ color: 'primary.main' }}></Button></Link></MenuItem>
                        <MenuItem><Link to="moto"><Button size="medium" startIcon={<TwoWheelerIcon />} sx={{ color: 'primary.main' }}></Button></Link></MenuItem>
                        <MenuItem><Link to="vehicles"><Button startIcon={<ListIcon />} sx={{ color: 'primary.main' }}></Button></Link></MenuItem>
                    </MenuList>
                </Menu>
                <Button sx={{ color: 'primary.main', ml: "auto" }} onClick={changeLocale}>{t.lang_name}</Button>
                <IconButton sx={{ color: 'primary.main' }} onClick={changeTheme}>{themes[themeIndex].icon}</IconButton>
            </Box>
            <Divider />
            <CarsProvider>
                <MotoProvider>
                    <Box sx={{ overflowY: "auto", minHeight: "100vh", minWidth: "100vw", m: 0, p: 0, bgcolor: 'background.default' }}>
                        <Outlet />
                    </Box>
                </MotoProvider>
            </CarsProvider>
        </ThemeProvider>
    );
}
