import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsPage } from './ratings.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { Firestore } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs'; 

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  const galleryServiceMock = {
    getScenariosOnly: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsPage],
      providers: [
        provideIonicAngular(),

        { provide: GalleryService, useValue: galleryServiceMock },

        { provide: Firestore, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});