import { useContext } from "react"
import { CarsContext } from "../components/providers/carsProvider"
import { MotoContext } from "../components/providers/motoProvider";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import { engineTypes } from "../lib/types";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TwoWheeler from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { LocaleContext } from "../components/providers/localeProvider";

export function VehicleList() {
    const { cars } = useContext(CarsContext)
    const { Motorcycles } = useContext(MotoContext)
    const { translation } = useContext(LocaleContext)
    const f = translation.form

    const columns: GridColDef[] = [
        { field: 'type', headerName: f.type, width: 50, renderCell: (params) => params.row.type === "Car" ? <DirectionsCarIcon sx={{color: 'primary.main', mb: -0.5}}/> : <TwoWheeler  sx={{color: 'primary.main', mb: -1}}/>},
        { field: 'model', headerName: f.model, width: 150 },
        { field: 'maker', headerName: f.maker, width: 150 },
        { field: 'year', type: "number", headerName: f.year, width: 150 },
        { field: 'engine', headerName: f.engine, width: 150, type: 'singleSelect', valueOptions: engineTypes },
        { field: 'favorite', headerName: f.favorite, width: 150, type: 'boolean', renderCell: (params) => params.row.favorite ? <FavoriteIcon sx={{color: 'primary.main'}}/> : <FavoriteBorderIcon  sx={{color: 'primary.main'}}/>},
    ]

    const rows = [
        ...cars.map((car, i) => ({ id: i, type: "Car", ...car })),
        ...Motorcycles.map((moto, i) => ({ id: i+cars.length, type: "Motorcycle", ...moto }))].sort((a, b) => a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1)

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h4' align='center' sx={{mt: 2}} color="primary.main">{f.vehicle_list}</Typography>
            <Box sx={{ height: 400, width: '70%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    )
}