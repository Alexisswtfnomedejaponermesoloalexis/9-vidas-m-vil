import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
// Importamos lo necesario para que no falle por culpa de Ionic
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente standalone
      imports: [AppComponent],
      // Proveemos lo básico (Router y Ionic) para que no se queje
      providers: [
        provideRouter([]),
        provideIonicAngular({}) 
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});