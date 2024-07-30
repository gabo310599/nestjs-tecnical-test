/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateCharactersEpisodesUnionDto{
    
    constructor(
        init: string,
        finish: string,
    ){
        this.init = init;
        this.finish = finish;
    }

    @IsString()
    @IsNotEmpty()
    init: string;

    @IsString()
    @IsNotEmpty()
    finish: string;
}