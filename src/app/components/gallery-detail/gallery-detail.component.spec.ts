import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryDetailComponent } from './gallery-detail.component';
import { ModalController } from '@ionic/angular/standalone';

describe('GalleryDetailComponent', () => {
  let component: GalleryDetailComponent;
  let fixture: ComponentFixture<GalleryDetailComponent>;

  // Creamos un objeto falso para el ModalController
  const modalCtrlMock = {
    dismiss: () => Promise.resolve(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 1. CORRECCIÓN PRINCIPAL:
      // Los componentes Standalone van en IMPORTS, no en declarations
      imports: [GalleryDetailComponent], 
      
      // 2. Proveemos el Mock del ModalController
      providers: [
        { provide: ModalController, useValue: modalCtrlMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryDetailComponent);
    component = fixture.componentInstance;
    
    // 3. Importante: Le damos datos falsos al 'item' para que el HTML no falle al cargar
    component.item = { 
      nombre: 'Test Gato', 
      info: 'Info de prueba', 
      imagen: 'img.jpg', 
      history: 'Historia' 
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});