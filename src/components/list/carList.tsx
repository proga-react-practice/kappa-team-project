import { Card, CardContent, Container, Box, List, ListItem, Slide, Typography, ButtonGroup, IconButton, TextField, InputAdornment } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';
import { CarsContext } from '../providers/carsProvider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LocaleContext } from '../providers/localeProvider';
import SearchIcon from '@mui/icons-material/Search';
import { Car } from '../../lib/types';

interface CarListProps {
    handleEdit: (i: number) => void
}

export default function CarList({ handleEdit }: CarListProps) {
    const [droppableId, setDroppableId] = useState<string>('')
    const [searchQuery, setSearhQuery] = useState<string>('')
    const [filteredCars, setFilteredCars] = useState<Car[]>([])

    const { cars, deleteCar, moveCar, toggleFavoriteCar } = useContext(CarsContext)
    const { translation } = useContext(LocaleContext)
    const f = translation.form

    useEffect(() => {
        setDroppableId('car-list')
    }, [])

    const [visibleCars, setVisibleCars] = useState<boolean[]>(cars.map(() => true))

    useEffect(() => {
        setVisibleCars(cars.map(() => true))
    }, [cars])

    const handleDelete = (i : number) => { // Function to animate car deletion from the list
        setVisibleCars(visibleCars.map((_, index) => index === i ? false : true))
        
        setTimeout(() => {
            deleteCar(i)
        }, 500)
    }

    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        if (!result.destination) return
        moveCar(result.source.index, result.destination.index)
    }

    useEffect(() => {
        setFilteredCars(
            cars.filter(
                (car) => (
                    Object.values(car).map(
                        (field) => field?.toString().includes(searchQuery)
                    )
                ).includes(true)
            )
        )
    }, [cars, searchQuery])

    return (
        <>
            { cars.length > 0 &&
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <List sx={{ overflowY: 'auto', 
                                overflowX: 'hidden', 
                                maxHeight: {xs: 200, md: 300},
                                scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}
                            ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredCars.map((car, i) => (
                            <Draggable draggableId={`car-item-${i}`} key={i} index={i}>
                                {(provided) => (
                                    <ListItem 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <Slide direction='left' in={visibleCars[i]} unmountOnExit mountOnEnter timeout={500}>
                                            <Card sx={{width: 300}}>
                                                <CardContent>
                                                    <Box display='flex'>
                                                        <Container>
                                                            <Typography><b>{f.maker}: </b>{car.maker}</Typography>
                                                            <Typography><b>{f.model}: </b> {car.model}</Typography>
                                                            <Typography><b>{f.year}: </b> {car.year}</Typography>
                                                            <Typography><b>{f.engine}: </b> {car.engine}</Typography>
                                                        </Container>
                                                        <ButtonGroup orientation='vertical'>
                                                            <IconButton color='error' onClick={() => {toggleFavoriteCar(i)}}>{car.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</IconButton>
                                                            <IconButton color='warning' onClick={() => {handleEdit(i)}}><EditIcon /></IconButton>
                                                            <IconButton color='error' onClick={() => {handleDelete(i)}}><DeleteIcon /></IconButton>
                                                        </ButtonGroup>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Slide>
                                    </ListItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>)}
                </Droppable>
            </DragDropContext>
        </>
    )
}