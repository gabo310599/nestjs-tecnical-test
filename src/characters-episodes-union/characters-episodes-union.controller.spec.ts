import { Test, TestingModule } from '@nestjs/testing';
import { CharactersEpisodesUnionController } from './characters-episodes-union.controller';

describe('CharactersEpisodesUnionController', () => {
  let controller: CharactersEpisodesUnionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersEpisodesUnionController],
    }).compile();

    controller = module.get<CharactersEpisodesUnionController>(CharactersEpisodesUnionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
