/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class UpdateEpisodeDto{
    
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
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    init: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    finish: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    subcategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    statusId: number;

}