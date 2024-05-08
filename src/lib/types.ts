export interface Car { // Car object fields
    maker: string
    model: string
    year: string
    engine: string
}

export interface Motorcycle {
    id: number;
    maker: string;
    model: string;
    year: number;
    engine: string;
}

export const engineTypes = ['Petrol', 'Diesel', 'Electric'] // Engine types

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: '', model: '', year: '', engine: '' } // Empty car object