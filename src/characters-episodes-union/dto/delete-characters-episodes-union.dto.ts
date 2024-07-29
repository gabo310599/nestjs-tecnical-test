/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator'

export class DeleteCharactersEpisodesUnionDto{
    
    constructor(
        characterId: number,
        episodeId: number,
    ){
        this.characterId = characterId;
        this.episodeId = episodeId;
    }

    @IsNumber()
    @IsNotEmpty()
    characterId: number;

    @IsNumber()
    @IsNotEmpty()
    episodeId: number;

}