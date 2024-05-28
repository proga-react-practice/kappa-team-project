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
    InputAdornment,
    Pagination  // Import Pagination
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

function onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
}

interface Vehicle extends Car, Motorcycle {
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
            {vehicle.image ?
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
                    <Link to={"/vehicle/" + vehicle.id}>
                        <LaunchIcon sx={{ color: 'primary.main' }} />
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
    const { form } = translation;
    const { Motorcycles, favoriteMotorcycle } = useContext(MotoContext) || { Motorcycles: [] };

    const engineTypes = [form.petrol, form.diesel, form.electric];

    const [searchParams, setSearchParams] = useSearchParams();
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
    const [yearFromFilter, setYearFromFilter] = useState(searchParams.get("yearFrom") || "");
    const [yearToFilter, setYearToFilter] = useState(searchParams.get("yearTo") || "");
    const [engineFilter, setEngineFilter] = useState(searchParams.get("engine") || "");
    const [makerFilter, setMakerFilter] = useState(searchParams.get("maker") || "");
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 6; 

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
        setCurrentPage(1);
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

    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = rows.slice(indexOfFirstVehicle, indexOfLastVehicle);
    const totalPages = Math.ceil(rows.length / vehiclesPerPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box sx={{ paddingTop: 3, paddingLeft: 1, paddingRight: 1 }}>
                <Typography variant='h4' align='left' sx={{ mt: 2, typography: { xs: 'h4', md: 'h3' } }} color="primary.main">{form.vehicle_list}</Typography>
                <Divider sx={{ width: { xs: '0%', md: "100%" } }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', width: '90vw' }}>
                <Sidebar >
                    <Typography variant="h6" color="primary.main" >{form.filters}</Typography>

                    <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{form.type}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="type"
                                    name="type"
                                    value={typeFilter}
                                    onChange={(e) => handleFilterChange("type", e.target.value)}
                                >
                                    <FormControlLabel value="" control={<Radio />} label={form.all} />
                                    <FormControlLabel value="Car" control={<Radio />} label={form.car} />
                                    <FormControlLabel value="Motorcycle" control={<Radio />} label={form.motorcycle} />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{form.engine}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="engine"
                                    name="engine"
                                    value={engineFilter}
                                    onChange={(e) => handleFilterChange("engine", e.target.value)}
                                >
                                    <FormControlLabel value="" control={<Radio />} label={form.all} />
                                    <FormControlLabel value="0" control={<Radio />} label={form.petrol} />
                                    <FormControlLabel value="1" control={<Radio />} label={form.diesel} />
                                    <FormControlLabel value="2" control={<Radio />} label={form.electric} />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{form.year}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    label={form.from}
                                    type="number"
                                    value={yearFromFilter}
                                    onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label={form.to}
                                    type="number"
                                    value={yearToFilter}
                                    onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{form.maker}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label={form.maker}
                                select
                                value={makerFilter}
                                onChange={(e) => handleFilterChange("maker", e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value="">{form.all}</MenuItem>
                                {[...carMakers, ...motoMakers].filter(onlyUnique).sort().map((maker) =>
                                    <MenuItem key={maker} value={maker}>{maker}</MenuItem>
                                )}
                            </TextField>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{form.search}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label={form.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Sidebar>
                <Content>
                    <Grid container spacing={2}>
                        {currentVehicles.map((vehicle, i) =>
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <VehicleCard
                                    vehicle={vehicle}
                                    engineTypes={engineTypes}
                                    toggleFavorite={vehicle.type === "Car" ? toggleFavoriteCar : favoriteMotorcycle}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Box sx={{ paddingTop: 2 }}>
                        <Divider sx={{ width: { xs: '0%', md: "100%" } }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center',  padding: 2,}}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Content>
            </Box>
        </>
    );
};

export default CustomList;
