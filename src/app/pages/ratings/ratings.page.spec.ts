import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsPage } from './ratings.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

// 1. Imports necesarios
import { Firestore } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery.service';
import { of } from 'rxjs';

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  // 2. Mock de GalleryService con datos de prueba
  const galleryServiceMock = {
    getScenariosOnly: () => of([
      { nombre: 'Anor Londo', imagen: 'anor.jpg', info: '', history: '', category: 'Escenario' },
      { nombre: 'Majula', imagen: 'majula.jpg', info: '', history: '', category: 'Escenario' }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsPage],
      providers: [
        provideIonicAngular(),
        
        // Mocks de Servicios
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Firestore, useValue: {} } // Mock vacío para que no falle el constructor
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- 1. PRUEBAS DE ESTRELLAS ---
  it('should set rating value', () => {
    component.setRating(5);
    expect(component.currentRating).toBe(5);
    expect(component.ratingForm.get('rating')?.value).toBe(5);
  });

  it('should handle star hover effects', () => {
    // Entrar
    component.starEnter(3);
    expect(component.hoverRating).toBe(3);
    
    // Salir
    component.starLeave();
    expect(component.hoverRating).toBe(0);
  });

  it('should return correct star color', () => {
    component.currentRating = 4;
    
    // Caso: Estrella menor al rating (debe ser dorada)
    const colorActive = component.getStarColor(3); 
    expect(colorActive).toBe('#ffc72c');

    // Caso: Estrella mayor al rating (debe ser gris)
    const colorInactive = component.getStarColor(5); 
    expect(colorInactive).toBe('#4a4a58');
  });

  // --- 2. PRUEBA DE ESCENARIO ---
  it('should update selected scenario on change', () => {
    const mockScenario = { nombre: 'Test', imagen: 'test.jpg' };
    // Simulamos el evento que envía el ion-select/select
    const mockEvent = { detail: { value: mockScenario } };
    
    component.onScenarioChange(mockEvent);
    
    expect(component.selectedScenario).toEqual(mockScenario as any);
  });

  // --- 3. PRUEBA DE ENVÍO (Validación) ---
  it('should show alert if form is invalid on submit', async () => {
    spyOn(window, 'alert'); // Espiamos la alerta
    
    // El formulario inicia vacío (inválido)
    await component.onSubmit();
    
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Por favor/));
    expect(component.ratingForm.touched).toBeTrue();
  });

  // --- 4. PRUEBA DE RESETEO (Llamada directa) ---
  it('should reset form and state correctly', () => {
    // Preparamos el estado "sucio"
    component.currentRating = 5;
    component.selectedScenario = { nombre: 'A', imagen: '', info: '', history: '', category: '' };
    
    // Llamamos a la función privada (usando 'any' para saltar la restricción de TS)
    (component as any).resetForm();

    // Verificamos que todo volvió a cero
    expect(component.currentRating).toBe(0);
    expect(component.selectedScenario).toBeNull();
    expect(component.ratingForm.value.comment).toBe(null);
  });

});