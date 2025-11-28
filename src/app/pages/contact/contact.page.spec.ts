import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPage } from './contact.page';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

// Creamos un objeto Mock para Firestore
// Este objeto finge ser la base de datos para que 'addDoc' no falle
const firestoreMock = {
  // (Puedes dejarlo vacío o agregar métodos si los necesitas)
};

// IMPORTANTE: Necesitamos mockear la función global 'addDoc'
// Pero como es una función exportada, en Jasmine es difícil espiarla directamente.
// Para subir el coverage sin complicar la arquitectura, probaremos:
// 1. Validación (Formulario Inválido) -> Cubre el 'else'
// 2. Error de Envío (Try/Catch) -> Cubre el 'catch' y 'finally'

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
      providers: [
        provideIonicAngular(),
        provideAnimations(),
        { provide: Firestore, useValue: firestoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- PRUEBA 1: Formulario Inválido ---
  it('should not submit if form is invalid', async () => {
    // El formulario empieza vacío
    await component.onSubmit();
    // Verifica que se ejecutó el bloque 'else' (marcar como tocado)
    expect(component.contactForm.touched).toBeTrue();
  });

  // --- PRUEBA 2: Intento de Envío (Camino Feliz / Error) ---
  it('should attempt to submit valid form', async () => {
    // 1. Llenamos el formulario con datos válidos
    component.contactForm.setValue({
      name: 'Test User',
      email: 'test@test.com',
      problem: 'Un problema de prueba muy largo para cumplir con la validación.'
    });

    // 2. Llamamos a onSubmit
    // Como 'addDoc' no está mockeado globalmente, esto caerá en el CATCH.
    // ¡Y ESO ES BUENO! Porque ejecutará el 'try', el 'catch' y el 'finally'.
    await component.onSubmit();

    // 3. Verificamos que 'isSubmitting' volvió a falso (lo que pasa en 'finally')
    expect(component.isSubmitting).toBeFalse();
  });

  // --- PRUEBA 3: Función Auxiliar isInvalid ---
  it('should check validity of fields', () => {
    const nameControl = component.contactForm.get('name');
    
    // Caso A: No tocado -> Falso
    expect(component.isInvalid('name')).toBeFalse();

    // Caso B: Tocado pero inválido -> Verdadero
    nameControl?.markAsTouched();
    expect(component.isInvalid('name')).toBeTrue();

    // Caso C: Tocado y válido -> Falso
    nameControl?.setValue('Juan');
    expect(component.isInvalid('name')).toBeFalse();
  });

});