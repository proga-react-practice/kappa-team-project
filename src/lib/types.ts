export interface Car { // Car object fields
    maker: string
    model: string
    year: string
    engine: string
}

export interface Motorcycle {
    maker: string;
    model: string;
    year: string;
    engine: string;
}

export const engineTypes = ['Petrol', 'Diesel', 'Electric'] // Engine types

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: '', model: '', year: '', engine: '' } // Empty car object