
export type Car = { // Car object fields
    maker: typeof carMakers[number] | undefined;
    model: string | undefined;
    year: number | undefined;
    engine: typeof engineTypes[number] | undefined;
    favorite: boolean;
}

export type Motorcycle = {
    maker: string;
    model: string;
    year: string;
    engine: string;
    favorite: boolean;

}

export const engineTypes = ['Petrol', 'Diesel', 'Electric'] // Engine types
export const carMakers = ['Toyota', 'Honda', 'Ford']

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: undefined, model: undefined, year: undefined, engine: undefined, favorite: false } // Empty car object