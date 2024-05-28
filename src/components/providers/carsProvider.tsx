import { createContext, useState } from 'react'
import { Car } from '../../lib/types'

interface CarsContextProps {
    cars: Car[],
    setCars: (cars: Car[]) => void,
    addCar: (car: Car) => void,
    deleteCar: (index: number) => void,
    editCar: (index: number | null, car: Car) => void,
    moveCar: (from: number, to: number) => void,
    toggleFavoriteCar: (index: number) => void,
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
        toggleFavoriteCar: () => {},
    }
)

export default function CarsProvider({children}: CarsProviderProps) {
    const [cars, setCars] = useState<Car[]>([])

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

    function toggleFavoriteCar(i: number) { // Function to favorite a car
        setCars(cars.map((car, index) => index === i ? {...car, favorite: !car.favorite} : car))
    }

    return (
        <CarsContext.Provider value={{cars, setCars, addCar, deleteCar, editCar, moveCar, toggleFavoriteCar}}>
            {children}
        </CarsContext.Provider>
    )
}