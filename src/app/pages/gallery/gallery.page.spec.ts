import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GalleryPage } from './gallery.page';
import { provideIonicAngular, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { GalleryService, GalleryItem } from '../../services/gallery.service';
import { of, BehaviorSubject } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('GalleryPage', () => {
  let component: GalleryPage;
  let fixture: ComponentFixture<GalleryPage>;

  // Datos de prueba
  const mockItems: GalleryItem[] = [
    { nombre: 'Gato', category: 'Protagonista', info: '', imagen: '', history: '' },
    { nombre: 'Anor Londo', category: 'Escenario', info: '', imagen: '', history: '' }
  ];

  const galleryServiceMock = {
    getGalleryItems: () => of(mockItems)
  };

  const modalCtrlMock = {
    create: () => Promise.resolve({ present: () => Promise.resolve() })
  };

  // Subject para manipular la URL
  const queryParamsSubject = new BehaviorSubject<any>({});
  const activatedRouteMock = {
    queryParams: queryParamsSubject.asObservable()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPage],
      providers: [
        provideIonicAngular(),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Firestore, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPage);
    component = fixture.componentInstance;
    // NO llamamos a fixture.detectChanges() aquí para poder probar ngOnInit manualmente
  });

  it('should create', () => {
    fixture.detectChanges(); // Llamamos manual aquí
    expect(component).toBeTruthy();
  });

  // ... (Tus pruebas de selectCategory, resetCategory, openDetailModal siguen igual) ...
  // (Asegúrate de agregar fixture.detectChanges() al principio de ellas si lo necesitan)

  // --- PRUEBA DE REDIRECCIÓN (queryParams) ---
  it('should handle "category" query param', fakeAsync(() => {
    // 1. Emitimos el valor ANTES de iniciar el componente
    queryParamsSubject.next({ category: 'Escenario' });
    
    // 2. Iniciamos el componente (esto dispara ngOnInit)
    fixture.detectChanges(); 
    tick(); // Esperamos a que se procese

    expect(component.selectedCategory).toBe('Escenario');
  }));

  // // --- PRUEBA DE REDIRECCIÓN COMPLEJA (openReview) ---
  // it('should handle "openReview" query param', fakeAsync(() => {
  //   // 1. Emitimos el valor ANTES de iniciar
  //   queryParamsSubject.next({ openReview: 'Anor Londo' });
    
  //   // 2. Iniciamos el componente
  //   fixture.detectChanges(); // ngOnInit se ejecuta aquí
    
  //   // 3. Espiamos AHORA (después de ngOnInit pero antes de que termine el tick)
  //   spyOn(component, 'selectCategory').and.callThrough();
  //   spyOn(component, 'openReviewsModal').and.callThrough();

  //   // 4. Avanzamos el tiempo para que los observables internos (galleryItems$) emitan
  //   tick(); 

  //   // 5. Verificaciones
  //   expect(component.selectCategory).toHaveBeenCalledWith('Escenario');
  //   expect(component.openReviewsModal).toHaveBeenCalledWith(
  //     jasmine.objectContaining({ nombre: 'Anor Londo' })
  //   );
  // }));
});