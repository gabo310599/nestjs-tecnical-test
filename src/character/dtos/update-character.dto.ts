/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateCharacterDto{
    
    constructor(
        name: string,
        subcategoryId: number,
        statusId: number,
        gender: string,
        validationName: string,
        validationType: number
    ){
        this.name = name;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
        this.gender = gender;
        this.validationName = validationName;
        this.validationType = validationType;
    }

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    statusId: number;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    gender: string;

    @IsString()
    @IsNotEmpty()
    validationName: string;

    @IsNumber()
    @IsNotEmpty()
    validationType: number;

}