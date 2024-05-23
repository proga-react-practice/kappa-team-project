import { Box, Card, CardContent, Typography } from "@mui/material"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { CarsContext } from "../components/providers/carsProvider"
import { MotoContext } from "../components/providers/motoProvider"
import { LocaleContext } from "../components/providers/localeProvider"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TwoWheeler from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function VehiclePage() {
    const { id } = useParams<{ id: string }>()
    const {cars} = useContext(CarsContext)
    const {Motorcycles} = useContext(MotoContext)
    const { translation } = useContext(LocaleContext)
    const t = translation.form

    const vehicle = cars[Number(id)] || Motorcycles[Number(id)-cars.length]
    const motorcycle = Number(id) >= cars.length

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h3' align='center' sx={{mt: 2}} color="primary.main">{vehicle.model} {motorcycle ? <TwoWheeler fontSize="large" /> : <DirectionsCarIcon fontSize="large" />}</Typography>
            <Card sx={{ height: 400, width: '70%', display: "flex" }}>
                {vehicle.image && <img src={vehicle.image} alt={vehicle.model}/>}
                <CardContent>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2, ml: 2}}>
                        <Typography variant='h5'>{t.maker}: {vehicle.maker}</Typography>
                        <Typography variant='h5'>{t.year}: {vehicle.year}</Typography>
                        <Typography variant='h5'>{t.engine}: {vehicle.engine}</Typography>
                        <Typography variant='h5'>{t.favorite}: {vehicle.favorite ? <FavoriteIcon sx={{color: 'primary.main'}}/> : <FavoriteBorderIcon  sx={{color: 'primary.main'}}/>}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}