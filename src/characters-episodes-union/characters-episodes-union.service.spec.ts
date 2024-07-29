import { Test, TestingModule } from '@nestjs/testing';
import { CharactersEpisodesUnionService } from './characters-episodes-union.service';

describe('CharactersEpisodesUnionService', () => {
  let service: CharactersEpisodesUnionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersEpisodesUnionService],
    }).compile();

    service = module.get<CharactersEpisodesUnionService>(CharactersEpisodesUnionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
