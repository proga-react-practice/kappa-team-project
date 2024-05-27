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
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    TextField,
    MenuItem,
    InputAdornment
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { Link, useSearchParams } from 'react-router-dom';
import { MotoContext } from "../providers/motoProvider";
import { CarsContext } from "../providers/carsProvider";
import { LocaleContext } from "../providers/localeProvider";
import { carMakers, motoMakers } from "../../lib/constants";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import { Car, Motorcycle } from "../../lib/types";

function onlyUnique(value : any, index : number, array : any[]) {
    return array.indexOf(value) === index;
}

interface Vehicle extends Car, Motorcycle{
    id: number;
    type: string;
}

interface VehicleCardProps {
    vehicle: Vehicle;
    engineTypes: string[];
    toggleFavorite: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, engineTypes, toggleFavorite }) => {
    return (
        <Card>
            { vehicle.image ?
            <CardMedia
                component="img"
                alt={vehicle.model}
                height="140"
                image={vehicle.image}
                title={vehicle.model}
            />
            : 
            <Box sx={{ height: 140, backgroundColor: 'background.default', display: "flex", alignItems: "center", justifyItems: "center" }}>
                <ImageNotSupportedIcon sx={{ fontSize: 60, m: 'auto', color: "secondary.main" }} />
            </Box>
            }
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
                    <Link to={"/vehicle/"+vehicle.id}>
                        <LaunchIcon sx={{color: 'primary.main'}}/>
                    </Link>
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
    maxHeight: 'calc(100vh - 64px)',
}));

const CustomList: React.FC = () => {
    const { cars, toggleFavoriteCar } = useContext(CarsContext) || { cars: [] };
    const { translation } = useContext(LocaleContext);
    const { form: { vehicle_list } } = translation;
    const { Motorcycles, favoriteMotorcycle } = useContext(MotoContext) || { Motorcycles: [] };
    const f = translation.form;

    const engineTypes = [f.petrol, f.diesel, f.electric];

    const [searchParams, setSearchParams] = useSearchParams();
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
    const [yearFromFilter, setYearFromFilter] = useState(searchParams.get("yearFrom") || "");
    const [yearToFilter, setYearToFilter] = useState(searchParams.get("yearTo") || "");
    const [engineFilter, setEngineFilter] = useState(searchParams.get("engine") || "");
    const [makerFilter, setMakerFilter] = useState(searchParams.get("maker") || "");
    const [searchQuery, setSearhQuery] = useState("")

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
        setYearFromFilter(searchParams.get("yearFrom") || "");
        setYearToFilter(searchParams.get("yearTo") || "");
        setEngineFilter(searchParams.get("engine") || "");
        setMakerFilter(searchParams.get("maker") || "");
    }, [searchParams]);

    const rows = [
        ...cars.map((car, i) => ({ id: i, type: "Car", ...car })),
        ...Motorcycles.map((moto, i) => ({ id: i + cars.length, type: "Motorcycle", ...moto }))
    ].sort((a, b) => a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1)
      .filter(vehicle => 
          (typeFilter ? vehicle.type === typeFilter : true) &&
          (yearFromFilter && vehicle.year ? vehicle.year >= parseInt(yearFromFilter) : true) &&
          (yearToFilter && vehicle.year ? vehicle.year < parseInt(yearToFilter) : true) &&
          (engineFilter ? vehicle.engine !== undefined && vehicle.engine.toString() === engineFilter : true) &&
          (makerFilter ? vehicle.maker === makerFilter : true) && 
          (vehicle.model && searchQuery ? vehicle.model.includes(searchQuery) : true)
      );

    return (
        <>
            <Box sx={{ paddingTop: 3, paddingLeft: 1 }}>
                <Typography variant='h4' align='left' sx={{ mt: 2, typography: { xs: 'h4', md: 'h3' } }} color="primary.main">{vehicle_list}</Typography>
                <Divider sx={{ width: { xs: '0%', md: "100%" } }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', width: '100vw' }}>
                <Sidebar >
                    <Typography variant="h6" color="primary.main" >Filters</Typography>
                    
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
                                    <FormControlLabel value="0" control={<Radio />} label="Petrol" />
                                    <FormControlLabel value="1" control={<Radio />} label="Diesel" />
                                    <FormControlLabel value="2" control={<Radio />} label="Electric" />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Year</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{display: "flex", alignItems: "center", gap: 2}}>
                            <TextField 
                                label='From'
                                variant='outlined'
                                value={yearFromFilter}
                                onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                            />
                             - 
                            <TextField 
                                label='To'
                                variant='outlined'
                                value={yearToFilter}
                                onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Maker</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField 
                                label='Maker'
                                variant='outlined'
                                select
                                value={makerFilter}
                                fullWidth
                                onChange={(e) => handleFilterChange("maker", e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {carMakers.concat(motoMakers).filter(onlyUnique).map((maker, i) => (
                                    <MenuItem key={i} value={maker}>{maker}</MenuItem>
                                ))}
                            </TextField>
                        </AccordionDetails>
                    </Accordion>
                </Sidebar>
                <Content>
                    { (cars.length > 0 || Motorcycles.length > 0) &&
                        <TextField 
                            label={f.search} 
                            variant='outlined' 
                            sx={{width: '100%', marginY: 1}}
                            value={searchQuery}
                            onChange={(e) => {setSearhQuery(e.target.value)}}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                                ),
                            }}
                        />
                    }
                    <Grid container spacing={2}>
                        {rows.map((vehicle, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ paddingRight: { xs: 3, md: 0 }, paddingBottom: { xs: 0, md: 0 } }}>
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
        </>
    );
};

export default CustomList;
