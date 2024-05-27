import { VehicleList } from "../components/list/vehicleList"
import CustomList from "../components/list/сustomList"
import { IconButton } from "@mui/material"
import { useState } from "react"

import GridOnIcon from '@mui/icons-material/GridOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function ListPage() {
    const [listType, setListType] = useState(false)
    return (
        <>
        <IconButton
            color="primary"
            onClick={() => setListType(!listType)}
            sx={{position: "absolute", right: 0, mt: 2, mr: 2}}>
                {listType ? <GridOnIcon/> : <FormatListBulletedIcon/>}
            </IconButton>
        {listType ? <VehicleList /> : <CustomList />}
        </>
    )
}