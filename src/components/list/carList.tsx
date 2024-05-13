import { Card, CardContent, Container, Box, List, ListItem, Slide, Typography, ButtonGroup, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Car } from '../../lib/types'
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';

interface CarListProps {
    cars: Car[]
    deleteCar: (i: number) => void
    editCar: (i: number) => void
    moveCar: (from: number, to: number) => void
}

export default function CarList({ cars, deleteCar, editCar, moveCar } : CarListProps) {
    const [droppableId, setDroppableId] = useState<string>('')

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

    const handleEdit = (i : number) => { // Function to animate car edition from the list
        editCar(i)
    }

    const onDragEnd: OnDragEndResponder = (result: DropResult) => {
        if (!result.destination) return
        moveCar(result.source.index, result.destination.index)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <List sx={{ overflowY: 'auto', 
                            overflowX: 'hidden', 
                            maxHeight: {xs: 200, md: 400},
                            scrollbarColor: (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`}}
                        ref={provided.innerRef} {...provided.droppableProps}>
                    {cars.map((car, i) => (
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
                                                        <Typography><b>Maker: </b>{car.maker}</Typography>
                                                        <Typography><b>Model: </b> {car.model}</Typography>
                                                        <Typography><b>Year: </b> {car.year}</Typography>
                                                        <Typography><b>Engine: </b> {car.engine}</Typography>
                                                    </Container>
                                                    <ButtonGroup orientation='vertical'>
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
    )
}