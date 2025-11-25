import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsPage } from './ratings.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

// 1. Importamos lo necesario para los Mocks
import { Firestore } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs'; // 'of' crea un Observable instantáneo

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  // 2. Creamos el Servicio Falso (Mock)
  // Simulamos la función 'getScenariosOnly' para que devuelva una lista vacía
  // sin intentar conectarse a Firebase.
  const galleryServiceMock = {
    getScenariosOnly: () => of([]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsPage],
      providers: [
        provideIonicAngular(),

        // 3. LA SOLUCIÓN: Usar el Mock en lugar del servicio real
        { provide: GalleryService, useValue: galleryServiceMock },

        // 4. Mantener el Mock de Firestore para que el constructor no falle
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