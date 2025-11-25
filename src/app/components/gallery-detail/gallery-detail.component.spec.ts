import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryDetailComponent } from './gallery-detail.component';
import { ModalController } from '@ionic/angular/standalone';

describe('GalleryDetailComponent', () => {
  let component: GalleryDetailComponent;
  let fixture: ComponentFixture<GalleryDetailComponent>;

  const modalCtrlMock = {
    dismiss: () => Promise.resolve(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryDetailComponent], 
      
      providers: [
        { provide: ModalController, useValue: modalCtrlMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryDetailComponent);
    component = fixture.componentInstance;
    
    component.item = { 
      nombre: 'Test Gato', 
      info: 'Info de prueba', 
      imagen: 'img.jpg', 
      history: 'Historia',
      category: 'Protagonista'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});