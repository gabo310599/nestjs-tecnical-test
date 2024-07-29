/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateEpisodeDto{
    
    constructor(
        name: string,
        duration: string,
        statusId: number,
        subcategoryId: number,
    ){
        this.name = name;
        this.duration = duration;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
    }

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    duration: string

    @IsNumber()
    @IsNotEmpty()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    statusId: number;

}