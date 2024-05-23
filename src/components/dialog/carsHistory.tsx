import { useContext, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { CarsContext } from '../providers/carsProvider';
import { LocaleContext } from '../providers/localeProvider';

export default function CarHistory(){
    const [open, setOpen] = useState(false)
    const { translation } = useContext(LocaleContext)
    const f = translation.form
    const { history, commitIndex, revertTo } = useContext(CarsContext)

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <>
            {history.length > 1 && <IconButton color='primary' onClick={() => setOpen(true)}><AccountTreeIcon/></IconButton>}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{f.commit_hist}</DialogTitle>
                <DialogContent>
                    <Timeline position='alternate' sx={{width: 500}}>
                        {history.map((cars, i) => (
                            <TimelineItem key={i}>
                                <TimelineSeparator>
                                    <TimelineDot color={i === commitIndex ? 'primary' : 'secondary'} />
                                    {i !== history.length - 1 && <TimelineConnector sx={{ backgroundColor:'secondary.main' }} />}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Button onClick={() => revertTo(i)}>
                                        <Typography>{f.commit} {i}</Typography>
                                    </Button>
                                    <SimpleTreeView>
                                        <TreeItem label={` ${f.cars } (${cars.length})`} itemId='main'>
                                            {cars.map((car, j) => (
                                                <TreeItem key={j} itemId={j.toString()} label={car.model}>
                                                    <Typography><b>{f.model}:</b> {car.model}</Typography>
                                                    <Typography><b>{f.maker}:</b> {car.maker}</Typography>
                                                    <Typography><b>{f.year}:</b> {car.year}</Typography>
                                                    <Typography><b>{f.engine}:</b> {car.engine}</Typography>
                                                </TreeItem>
                                            ))}
                                        </TreeItem>
                                    </SimpleTreeView>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </DialogContent>
            </Dialog>
        </>
    )
}
