/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateEpisodeDto{
    
    constructor(
        name: string,
        init: string,
        finish: string,
        statusId: number,
        subcategoryId: number,
    ){
        this.name = name;
        this.init = init;
        this.finish = finish;
        this.subcategoryId = subcategoryId;
        this.statusId = statusId;
    }

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    init: string;

    @IsString()
    @IsNotEmpty()
    finish: string;

    @IsNumber()
    @IsNotEmpty()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    statusId: number;

}