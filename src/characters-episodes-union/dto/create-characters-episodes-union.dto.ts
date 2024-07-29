/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class CreateCharactersEpisodesUnionDto{
    
    constructor(
        characterId: number,
        episodeId: number,
        init?: string,
        finish?: string,
    ){
        this.characterId = characterId;
        this.episodeId = episodeId;
        this.init = init;
        this.finish = finish;
    }

    @IsNumber()
    @IsNotEmpty()
    characterId: number;

    @IsNumber()
    @IsNotEmpty()
    episodeId: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    init?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    finish?: string;
}