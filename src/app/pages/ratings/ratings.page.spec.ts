import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsPage } from './ratings.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

// 1. Importamos el token de Firestore
import { Firestore } from '@angular/fire/firestore';

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsPage],
      providers: [
        provideIonicAngular(), // Para los componentes de Ionic
        
        // 2. LA SOLUCIÓN:
        // Proveemos un objeto vacío ({}) cuando el componente pida 'Firestore'
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