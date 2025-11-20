import { ComponentFixture, TestBed } from '@angular/core/testing';
// IMPORTANTE: Asegúrate que este import coincida con el nombre de tu archivo real
import { GalleryPage } from './gallery.page'; 
import { provideIonicAngular } from '@ionic/angular/standalone';

// Imports para los Mocks
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('GalleryPage', () => { // <--- Fíjate que aquí dice 'GalleryPage'
  let component: GalleryPage;
  let fixture: ComponentFixture<GalleryPage>;

  // Mock del Servicio
  const galleryServiceMock = {
    getGalleryItems: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPage],
      providers: [
        provideIonicAngular(),
        
        // 1. Usamos el servicio falso
        { provide: GalleryService, useValue: galleryServiceMock },

        // 2. RED DE SEGURIDAD: Proveemos Firestore vacío
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