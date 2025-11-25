import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoresPage } from './scores.page'; 
import { provideIonicAngular } from '@ionic/angular/standalone';

import { Scores } from '../../services/scores.service';
import { Database } from '@angular/fire/database'; 
import { of } from 'rxjs';

describe('ScoresPage', () => {
  let component: ScoresPage;
  let fixture: ComponentFixture<ScoresPage>;

  const scoresMock = {
    getTopScores: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoresPage],
      providers: [
        provideIonicAngular(),
        
        { provide: Scores, useValue: scoresMock },

        { provide: Database, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});