import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoresPage } from './scores.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

// 1. Imports necesarios
import { Scores } from '../../services/scores.service';
import { Database } from '@angular/fire/database'; 
import { of } from 'rxjs';

describe('ScoresPage', () => {
  let component: ScoresPage;
  let fixture: ComponentFixture<ScoresPage>;

  // 2. Mock del Servicio con datos de prueba
  const scoresServiceMock = {
    getTopScores: () => of([
      { usuario: 'TestUser', score: 100, tiempo: 65, enemigos: 10, nivel: 1 }
    ]) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoresPage],
      providers: [
        provideIonicAngular(),
        // Proveemos los mocks
        { provide: Scores, useValue: scoresServiceMock },
        { provide: Database, useValue: {} } // Database vacía para el constructor
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- PRUEBA DE FORMATO DE TIEMPO ---
  it('should format time correctly', () => {
    // Caso 1: Menos de 10 segundos (debe agregar el cero '05')
    expect(component.formatTime(65)).toBe('1:05');
    
    // Caso 2: Exactamente 1 minuto
    expect(component.formatTime(60)).toBe('1:00');
    
    // Caso 3: Menos de 1 minuto
    expect(component.formatTime(30)).toBe('0:30');
  });
  
  // --- PRUEBA DE CARGA DE DATOS ---
  it('should load scores on init', () => {
    // Verificamos que la variable scores$ no sea nula después del ngOnInit
    expect(component.scores$).toBeDefined();
  });

});