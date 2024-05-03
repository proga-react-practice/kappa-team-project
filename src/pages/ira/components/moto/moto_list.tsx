import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import {Typography } from '@mui/material';

import { Motorcycle } from '../../types';

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  setMotorcycles: (motorcycles: Motorcycle[]) => void;
}

export default function MotorcycleList({ motorcycles, setMotorcycles }: MotorcycleListProps) {
  const [deletedIndex, setDeletedIndex] = React.useState<number | null>(null);

  const deleteMotorcycle = (index: number) => {
    const newMotorcycles = [...motorcycles];
    newMotorcycles.splice(index, 1);
    setDeletedIndex(index);
    setTimeout(() => {
      setDeletedIndex(null);
      setMotorcycles(newMotorcycles);
    }, 500);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ borderRadius: 5, margin: 1 }}>
      {motorcycles.map((motorcycle, i) => (
        <Collapse key={i} in={deletedIndex !== i} unmountOnExit>
          <Card className="motorcycle-item" sx={{ marginBottom: 1, borderBottom: 1 }}>
            <CardContent sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 1, paddingTop: 1 }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>Maker: {motorcycle.maker}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>Model: {motorcycle.model}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>Year: {motorcycle.year}</Typography>
              <Button onClick={() => deleteMotorcycle(i)} color='error' variant="contained">
                Delete
              </Button>
            </CardContent>
          </Card>
        </Collapse>
      ))}
    </Stack>
  );
      }  