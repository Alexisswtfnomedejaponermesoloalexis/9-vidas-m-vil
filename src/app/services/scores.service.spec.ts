import { TestBed } from '@angular/core/testing';
import { Scores } from './scores.service';
import { Database } from '@angular/fire/database'; 

describe('Scores', () => {
  let service: Scores;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Database, useValue: {} } 
      ]
    });
    service = TestBed.inject(Scores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});