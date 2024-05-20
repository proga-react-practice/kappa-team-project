
export type Car = { // Car object fields
    maker: typeof carMakers[number] | undefined;
    model: string | undefined;
    year: number | undefined;
    engine: typeof engineTypes[number] | undefined;
}

export type Motorcycle = {
    maker: string;
    model: string;
    year: string;
    engine: string;
}

export const engineTypes = ['Petrol', 'Diesel', 'Electric'] // Engine types
export const carMakers = ['Toyota', 'Honda', 'Ford']

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: undefined, model: undefined, year: undefined, engine: undefined } // Empty car object