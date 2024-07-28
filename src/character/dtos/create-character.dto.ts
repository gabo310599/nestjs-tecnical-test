/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCharacterDto{
    
    constructor(
        name: string,
        subcategoryId: number,
        statusId: number,
        gennder: string,
    ){
        this.name = name;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
        this.gender = gennder;
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

    @IsString()
    @IsNotEmpty()
    gender: string;

}