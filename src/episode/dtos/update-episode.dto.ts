/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateEpisodeDto{
    
    constructor(
        name: string,
        duration: string,
        statusId: number,
        subcategoryId: number,
        validationName: string,
        validationSubcategory: number,
    ){
        this.name = name;
        this.duration = duration;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
        this.validationName = validationName;
        this.validationSubcategory = validationSubcategory;
    }

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    duration: string;

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
    validationName: string;

    @IsNumber()
    @IsNotEmpty()
    validationSubcategory: number;

}