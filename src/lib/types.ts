import { carMakers } from './constants';

export type Car = { // Car object fields
    maker: typeof carMakers[number] | undefined;
    model: string | undefined;
    year: number | undefined;
    engine: number | undefined;
    favorite: boolean;
    image: string | undefined;
}

export type Motorcycle = {
    maker: string| undefined;
    model: string| undefined;
    year: number | undefined;
    engine: number | undefined;
    favorite: boolean;
    image: string | undefined;


}

export interface FormErrors extends Car {}
