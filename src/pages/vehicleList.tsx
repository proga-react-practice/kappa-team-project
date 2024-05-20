import { useContext } from "react"
import { CarsContext } from "../components/providers/carsProvider"
import { MotoContext } from "../components/providers/motoProvider";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import { Car, engineTypes, Motorcycle } from "../lib/types";

import DeleteIcon from '@mui/icons-material/Delete';

export function VehicleList() {
    const { cars, setCars, deleteCar } = useContext(CarsContext)
    const { Motorcycles, setMotorcycles, deleteMotorcycle } = useContext(MotoContext)

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
        { field: 'type', headerName: 'Type', width: 150},
        { field: 'model', headerName: 'Model', width: 150, editable: true },
        { field: 'maker', headerName: 'Maker', width: 150 },
        { field: 'year', headerName: 'Year', width: 150, editable: true },
        { field: 'engine', headerName: 'Engine', width: 150, editable: true, type: 'singleSelect', valueOptions: engineTypes },
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
            <Typography variant='h4' align='center' sx={{mt: 2}} color="primary.main">Vehicle List</Typography>
            <Box sx={{ height: 400, width: '70%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    processRowUpdate={handleRowUpdate}
                    onProcessRowUpdateError={(params) => {console.log(params)}}
                />
            </Box>
        </Box>
    )
}