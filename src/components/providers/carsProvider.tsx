import { createContext } from 'react'
import { Car } from '../../lib/types'
import VCV from '../../lib/vcv'

interface CarsContextProps {
    cars: Car[],
    setCars: (cars: Car[]) => void,
    addCar: (car: Car) => void,
    deleteCar: (index: number) => void,
    editCar: (index: number | null, car: Car) => void,
    moveCar: (from: number, to: number) => void,
    revertTo: (index: number) => void,
    history: Car[][],
    commitIndex: number
}

interface CarsProviderProps {
    children?: React.ReactNode
}

export const CarsContext = createContext<CarsContextProps>(
    {
        cars: [], 
        setCars: () => {},
        addCar: () => {},
        deleteCar: () => {},
        editCar: () => {},
        moveCar: () => {},
        revertTo: () => {},
        history: [],
        commitIndex: 0
    }
)

export default function CarsProvider({children}: CarsProviderProps) {
    const { state : cars, 
		setValue : setCars, 
		revertTo : revertTo, 
		history : history,
		index: commitIndex } = VCV<Car[]>([])

    function addCar(car: Car) { // Function to add a car to the list
        setCars([...cars, car])
    }

    function deleteCar(i: number) { // Function to delete a car from the list
        setCars(cars.filter((_, index) => index !== i))
    }
    
    function editCar(i: number | null, car: Car) { // Function to edit a car from the list
        if (i === null) return
        setCars(cars.map((c, index) => index === i ? car : c))
    }

    function moveCar(from: number, to: number) { // Function to move a car in the list
		const newCars = [...cars]
		newCars.splice(to, 0, newCars.splice(from, 1)[0])
		setCars(newCars)
	}

    return (
        <CarsContext.Provider value={{cars, setCars, revertTo, history, commitIndex, addCar, deleteCar, editCar, moveCar}}>
            {children}
        </CarsContext.Provider>
    )
}