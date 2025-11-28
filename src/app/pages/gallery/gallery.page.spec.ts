import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryPage } from './gallery.page';
import { provideIonicAngular, ModalController } from '@ionic/angular/standalone';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { GalleryService, GalleryItem } from '../../services/gallery.service';
import { of, BehaviorSubject } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('GalleryPage', () => {
  let component: GalleryPage;
  let fixture: ComponentFixture<GalleryPage>;

  // --- MOCKS ---

  // 1. Mock de GalleryService con datos de prueba
  const mockItems: GalleryItem[] = [
    { nombre: 'Gato', category: 'Protagonista', info: '', imagen: '', history: '' },
    { nombre: 'Anor Londo', category: 'Escenario', info: '', imagen: '', history: '' }
  ];

  const galleryServiceMock = {
    getGalleryItems: () => of(mockItems)
  };

  // 2. Mock de ModalController
  const modalCtrlMock = {
    create: () => Promise.resolve({
      present: () => Promise.resolve()
    })
  };

  // 3. Mock de ActivatedRoute (para simular parámetros de URL)
  // Usamos BehaviorSubject para poder emitir valores nuevos durante la prueba
  const queryParamsSubject = new BehaviorSubject<any>({});
  const activatedRouteMock = {
    queryParams: queryParamsSubject.asObservable()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPage],
      providers: [
        provideIonicAngular(),
        // Mockeamos ActivatedRoute manualmente para tener control total
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Firestore, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- PRUEBAS DE CATEGORÍAS ---
  it('should select a category', () => {
    component.selectCategory('Enemigo');
    expect(component.selectedCategory).toBe('Enemigo');
  });

  it('should reset category', () => {
    component.selectCategory('Enemigo');
    component.resetCategory();
    expect(component.selectedCategory).toBeNull();
  });

  // --- PRUEBAS DE MODALES ---
  it('should open detail modal', async () => {
    const spy = spyOn(modalCtrlMock, 'create').and.callThrough();
    await component.openDetailModal(mockItems[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('should open reviews modal', async () => {
    const spy = spyOn(modalCtrlMock, 'create').and.callThrough();
    await component.openReviewsModal(mockItems[1]);
    expect(spy).toHaveBeenCalled();
  });

  // --- PRUEBA DE REDIRECCIÓN (queryParams) ---
  it('should handle "category" query param', () => {
    // Simulamos que la URL cambia a ?category=Escenario
    queryParamsSubject.next({ category: 'Escenario' });
    
    // Verificamos que la función selectCategory fue llamada
    expect(component.selectedCategory).toBe('Escenario');
  });

  // --- PRUEBA DE REDIRECCIÓN COMPLEJA (openReview) ---
  it('should handle "openReview" query param', () => {
    // Espiamos las funciones que se deben llamar
    spyOn(component, 'selectCategory');
    spyOn(component, 'openReviewsModal');

    // Simulamos ?openReview=Anor Londo
    queryParamsSubject.next({ openReview: 'Anor Londo' });

    // Como la suscripción está dentro del subscribe de galleryItems,
    // y usamos 'of' (síncrono), esto debería ejecutarse inmediatamente.
    
    expect(component.selectCategory).toHaveBeenCalledWith('Escenario');
    // Verificamos que se llamó con el ítem correcto (el que tiene nombre 'Anor Londo')
    expect(component.openReviewsModal).toHaveBeenCalledWith(jasmine.objectContaining({ nombre: 'Anor Londo' }));
  });
});