import { Gender } from '../enums/gender.enum';
import { Address } from './address.model';

export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    personalNumber: string;
    mobile: string;
    legalAddress: Address;
    actualAddress: Address;
    image: string;
}
