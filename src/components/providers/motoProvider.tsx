import { createContext, useState } from 'react'
import { Motorcycle } from '../../lib/types'

interface MotoContextProps {
    Motorcycles: Motorcycle[],
    setMotorcycles: (motos: Motorcycle[]) => void,
    addMotorcycle: (motos: Motorcycle) => void,
    deleteMotorcycle: (index: number) => void,
    favoriteMotorcycle: (index: number) => void,
    saveChanges: (editedMoto: Motorcycle, editIndex: number) => void
}

interface MotosProviderProps {
    children?: React.ReactNode
}

export const MotoContext = createContext<MotoContextProps>(
    {
        Motorcycles: [], 
        setMotorcycles: () => {},
        addMotorcycle: () => {},
        deleteMotorcycle: () => {},
        favoriteMotorcycle: () => {},
        saveChanges: () => {}
    }
)

export default function MotoProvider({children}: CarsProviderProps) {
    const [Motorcycles, setMotorcyclesState] = useState<Motorcycle[]>(localStorage.getItem('Motorcycles') ? JSON.parse(localStorage.getItem('Motorcycles') as string) : [])

    const setMotorcycles = (Motorcycles: Motorcycle[]) => {
        setMotorcyclesState(Motorcycles)
        localStorage.setItem('Motorcycles', JSON.stringify(Motorcycles))
    }

    const addMotorcycle = (motorcycle: Motorcycle) => {
        setMotorcycles([...Motorcycles, motorcycle]);
    };
    
      const deleteMotorcycle = (index: number) => {
        const newMotorcycles = Motorcycles.filter((_, i) => i !== index);
        setMotorcycles(newMotorcycles);
      };
    
      const saveChanges = (editedMoto: Motorcycle, editIndex: number) => {
        const newMotorcycles = [...Motorcycles];
        newMotorcycles[editIndex!] = editedMoto;
        setMotorcycles(newMotorcycles);
      };

      const favoriteMotorcycle = (i: number) => {

        setMotorcycles(Motorcycles.map((moto, index) => index === i ? {...moto, favorite: !moto.favorite} : moto)
        );
      }

    return (
        <MotoContext.Provider value={{Motorcycles, setMotorcycles, addMotorcycle, deleteMotorcycle, saveChanges, favoriteMotorcycle}}>
            {children}
        </MotoContext.Provider>
    )
}
