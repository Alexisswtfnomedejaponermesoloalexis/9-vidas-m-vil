import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryPage } from './gallery.page';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('GalleryPage', () => {
  let component: GalleryPage;
  let fixture: ComponentFixture<GalleryPage>;

  const galleryServiceMock = {
    getGalleryItems: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPage],
      providers: [
        provideIonicAngular(),
        
        provideRouter([]), 

        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Firestore, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});