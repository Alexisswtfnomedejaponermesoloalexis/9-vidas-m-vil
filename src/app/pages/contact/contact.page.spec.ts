import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPage } from './contact.page';

// 1. Importamos Firestore para usarlo como "token"
import { Firestore } from '@angular/fire/firestore';
// 2. Importamos las herramientas para que Ionic no falle (opcional pero recomendado)
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente que estamos probando
      imports: [ContactPage],
      
      // AQUÍ ESTÁ LA SOLUCIÓN:
      providers: [
        provideIonicAngular(), // Para que no se queje de los componentes Ionic
        
        // Le decimos al test: "Cuando el componente pida 'Firestore',
        // dale este objeto vacío ({}) en su lugar".
        { provide: Firestore, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});