
export interface Car { // Car object fields
    maker: string
    model: string
    year: string
    engine: typeof engineTypes[number]
}

export interface Motorcycle {
    maker: string;
    model: string;
    year: number;
    engine: string;
}

export const makers = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati'];

export const engineTypes = ['Petrol', 'Diesel', 'Electric'] // Engine types

export interface FormErrors extends Car {}

export const emptyCar: Car = { maker: '', model: '', year: '', engine: '' } // Empty car object