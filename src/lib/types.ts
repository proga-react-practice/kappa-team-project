
export type Car = { // Car object fields
    maker: typeof carMakers[number] | undefined;
    model: string | undefined;
    year: number | undefined;
    engine: number | undefined;
    favorite: boolean;
    image: string | undefined;
}

export type Motorcycle = {
    maker: string;
    model: string;
    year: string;
    engine: number | undefined;
    favorite: boolean;
    image: string | undefined;


}

export const carMakers = ['Toyota', 'Honda', 'Ford']

export interface FormErrors extends Car {}
