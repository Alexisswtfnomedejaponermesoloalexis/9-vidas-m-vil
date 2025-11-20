import { TestBed } from '@angular/core/testing';
import { GalleryService } from './gallery.service'; // <-- Ahora sí encontrará el archivo

// 1. Importamos el token de Firestore
import { Firestore } from '@angular/fire/firestore';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // 2. SOLUCIÓN: Le damos un objeto vacío cuando pida Firestore
        { provide: Firestore, useValue: {} }
      ]
    });
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});