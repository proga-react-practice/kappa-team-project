/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Rating,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import { MotoContext } from "../components/providers/motoProvider";
import { CarsContext } from "../components/providers/carsProvider";
import { LocaleContext } from "../components/providers/localeProvider";
interface VehicleCardProps {
    vehicle: any;
    engineTypes: string[];
    toggleFavorite: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, engineTypes, toggleFavorite }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                alt={vehicle.model}
                height="140"
                image={vehicle.image}
                title={vehicle.model}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {vehicle.model}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {vehicle.maker}, {vehicle.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {vehicle.engine !== undefined && engineTypes[vehicle.engine]}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Rating value={3} readOnly />
                    <IconButton color='error' onClick={() => toggleFavorite(vehicle.id)}>
                        {vehicle.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

const Sidebar = styled(Box)(({ theme }) => ({
    width: '20%',
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
        width: '100%',
        borderRight: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}));

const Content = styled(Box)(({ theme }) => ({
    width: '80%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        width: '100%'
    },
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 64px)',
}));
const Custom: React.FC = () => {
    const { cars, toggleFavoriteCar } = useContext(CarsContext) || { cars: [] };
    const { translation } = useContext(LocaleContext);
    const { form: { vehicle_list } } = translation;
    const { Motorcycles, favoriteMotorcycle } = useContext(MotoContext) || { Motorcycles: [] };
    const f = translation.form;

    const engineTypes = [f.petrol, f.diesel, f.electric];

    const [searchParams, setSearchParams] = useSearchParams();
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
    const [yearFilter, setYearFilter] = useState(searchParams.get("year") || "");
    const [engineFilter, setEngineFilter] = useState(searchParams.get("engine") || "");

    const handleFilterChange = (filter: string, value: string) => {
        if (value) {
            searchParams.set(filter, value);
        } else {
            searchParams.delete(filter);
        }
        setSearchParams(searchParams);
    };

    useEffect(() => {
        setTypeFilter(searchParams.get("type") || "");
        setYearFilter(searchParams.get("year") || "");
        setEngineFilter(searchParams.get("engine") || "");
    }, [searchParams]);

    const rows = [
        ...cars.map((car, i) => ({ id: i, type: "Car", ...car })),
        ...Motorcycles.map((moto, i) => ({ id: i + cars.length, type: "Motorcycle", ...moto }))
    ].sort((a, b) => a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1)
      .filter(vehicle => 
          (typeFilter ? vehicle.type === typeFilter : true) &&
          (yearFilter ? vehicle.year === parseInt(yearFilter) : true) &&
          (engineFilter ? vehicle.engine === parseInt(engineFilter) : true)
      );

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw' }}>
            <Box sx={{ paddingTop: 3, paddingLeft: 1 }}>
                <Typography variant='h4' align='left' sx={{ mt: 2, typography: { xs: 'h4', md: 'h3' } }} color="primary.main">{vehicle_list}</Typography>
                <Divider sx={{ width: { xs: '0%', md: "100%" } }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', width: '100vw' }}>
                <Sidebar>
                    <Typography variant="h6" color="primary.main">Filters</Typography>
                    
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="type"
                                    name="type"
                                    value={typeFilter}
                                    onChange={(e) => handleFilterChange("type", e.target.value)}
                                >
                                    <FormControlLabel value="" control={<Radio />} label="All" />
                                    <FormControlLabel value="Car" control={<Radio />} label="Car" />
                                    <FormControlLabel value="Motorcycle" control={<Radio />} label="Motorcycle" />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Year</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={yearFilter}
                                    onChange={(e) => handleFilterChange("year", e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    {[...new Set(rows.map(vehicle => vehicle.year))].map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Engine</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="engine"
                                    name="engine"
                                    value={engineFilter}
                                    onChange={(e) => handleFilterChange("engine", e.target.value)}
                                >
                                    <FormControlLabel value="" control={<Radio />} label="All" />
                                    {engineTypes.map((engine, index) => (
                                        <FormControlLabel key={index} value={index.toString()} control={<Radio />} label={engine} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>


                   

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Model</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Search Brand"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                            />
                            
                        </AccordionDetails>
                    </Accordion>
                </Sidebar>
                <Content>
                    <Grid container spacing={2}>
                        {rows.map((vehicle, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <VehicleCard
                                    vehicle={vehicle}
                                    engineTypes={engineTypes}
                                    toggleFavorite={vehicle.type === 'Car' ? toggleFavoriteCar : favoriteMotorcycle}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Content>
            </Box>
        </Box>
    );
};

export default Custom;