import { useContext } from "react"
import { CarsContext } from "../components/providers/carsProvider"
import { MotoContext } from "../components/providers/motoProvider";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import { Car, engineTypes, Motorcycle } from "../lib/types";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoWheeler from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { LocaleContext } from "../components/providers/localeProvider";

export function VehicleList() {
    const { cars, setCars, deleteCar } = useContext(CarsContext)
    const { Motorcycles, setMotorcycles, deleteMotorcycle } = useContext(MotoContext)
    const { translation } = useContext(LocaleContext)
    const f = translation.form
    function handleRowUpdate(newRow: any) {
        if (newRow.id === undefined) return
        const updatedRow = { ...newRow, isNew: false };
        if (newRow.id as number < cars.length)
            setCars(cars.map((car, i) => i === newRow.id ? newRow as Car : car))
        else
            setMotorcycles(Motorcycles.map((moto, i) => i === newRow.id - cars.length ? newRow as Motorcycle : moto))
        return updatedRow
    }

    function handleDelete(i: GridRowId){
        i = i as number
        if (i < cars.length)
            deleteCar(i)
        else
            deleteMotorcycle(i - cars.length)
    }

    const columns: GridColDef[] = [
        { field: 'type', headerName: f.type, width: 50, renderCell: (params) => params.row.type === "Car" ? <DirectionsCarIcon sx={{color: 'primary.main'}}/> : <TwoWheeler  sx={{color: 'primary.main'}}/>},
        { field: 'model', headerName: f.model, width: 150, editable: true },
        { field: 'maker', headerName: f.maker, width: 150 },
        { field: 'year', headerName: f.year, width: 150, editable: true },
        { field: 'engine', headerName: f.engine, width: 150, editable: true, type: 'singleSelect', valueOptions: engineTypes },
        { field: 'favorite', headerName: f.favorite, width: 150, type: 'boolean', editable: true, renderCell: (params) => params.row.favorite ? <FavoriteIcon sx={{color: 'primary.main'}}/> : <FavoriteBorderIcon  sx={{color: 'primary.main'}}/>},
        {field: 'actions', type: "actions", headerName: '', width: 50, cellClassName: 'actions', getActions: ({id}) => {
            return [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  color="error"
                  onClick={() => handleDelete(id)}
                />
              ];
        }
        }
    ]

    const rows = [
        ...cars.map((car, i) => ({ id: i, type: "Car", ...car })),
        ...Motorcycles.map((moto, i) => ({ id: i+cars.length, type: "Motorcycle", ...moto }))]

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h4' align='center' sx={{mt: 2}} color="primary.main">{f.vehicle_list}</Typography>
            <Box sx={{ height: 400, width: '70%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    processRowUpdate={handleRowUpdate}
                    onProcessRowUpdateError={(params) => {console.log(params)}}
                    editMode="row"
                />
            </Box>
        </Box>
    )
}