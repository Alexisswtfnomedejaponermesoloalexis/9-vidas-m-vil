import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioReviewsComponent } from './scenario-reviews.component';

import { ModalController } from '@ionic/angular/standalone';
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs';

describe('ScenarioReviewsComponent', () => {
  let component: ScenarioReviewsComponent;
  let fixture: ComponentFixture<ScenarioReviewsComponent>;

  const modalCtrlMock = {
    dismiss: () => Promise.resolve(true)
  };

  const galleryServiceMock = {
    getRatingsByScenario: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioReviewsComponent],
      
      providers: [
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: GalleryService, useValue: galleryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioReviewsComponent);
    component = fixture.componentInstance;
    
    component.scenarioName = 'Test Scenario'; 
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});