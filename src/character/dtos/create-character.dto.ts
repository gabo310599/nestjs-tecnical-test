/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCharacterDto{
    
    constructor(
        name: string,
        subcategoryId: number,
        statusId: number,
    ){
        this.name = name;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
    }

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    statusId: number;

}