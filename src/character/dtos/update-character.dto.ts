/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateCharacterDto{
    
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
    @IsOptional()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    statusId: number;

}