/*
  RATINGS.PAGE.TS
  Controlador de la página de Calificaciones.
  Maneja la interacción del usuario para calificar escenarios,
  incluyendo selección dinámica de escenarios desde Firebase,
  sistema de estrellas interactivo y envío de datos.
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { GalleryService, GalleryItem } from '../../services/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButtons, IonMenuButton, IonSelect, IonSelectOption]
})
export class RatingsPage implements OnInit {

  ratingForm!: FormGroup; 
  
  // Listas y variables para el manejo de datos dinámicos
  scenariosList: GalleryItem[] = [];
  selectedScenario: GalleryItem | null = null;

  // Variables de estado para el componente de estrellas
  maxStars: number = 5;
  currentRating: number = 0;
  hoverRating: number = 0;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore,
    private galleryService: GalleryService 
  ) {}

  ngOnInit(): void {
    // Carga inicial de escenarios filtrados desde el servicio
    this.galleryService.getScenariosOnly().subscribe(res => {
      this.scenariosList = res;
    });

    // Definición del formulario reactivo con validaciones
    this.ratingForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      scenario: [null, Validators.required],
      rating: [null, Validators.required], 
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Actualiza la vista previa del escenario al cambiar la selección
  onScenarioChange(event: any) {
    this.selectedScenario = event.detail.value;
  }

  // --- Lógica de UI para Estrellas ---

  // Fija la calificación al hacer clic
  setRating(rating: number) {
    this.currentRating = rating;
    this.ratingForm.get('rating')?.setValue(rating);
  }

  // Efecto visual al pasar el mouse (hover)
  starEnter(rating: number) {
    this.hoverRating = rating;
  }

  // Restaura el estado visual al salir del hover
  starLeave() {
    this.hoverRating = 0;
  }

  // Determina el color de cada estrella (dorado/gris) según el estado
  getStarColor(star: number): string {
    const activeRating = this.hoverRating || this.currentRating;
    return star <= activeRating ? '#ffc72c' : '#4a4a58'; 
  }
  
  // --- Envío de Datos ---

  async onSubmit() {
    if (!this.ratingForm.valid) {
      alert('Por favor, completa todos los campos.');
      this.ratingForm.markAllAsTouched();
      return;
    }

    // Extraemos el nombre del objeto escenario para guardarlo como string
    const scenarioObject = this.ratingForm.value.scenario;

    const ratingData = {
      nickname: this.ratingForm.value.nickname,
      scenario: scenarioObject.nombre, 
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment,
      timestamp: new Date()
    };

    try {
      // Guardado asíncrono en la colección 'ratings'
      const ratingsCollection = collection(this.firestore, 'ratings');
      await addDoc(ratingsCollection, ratingData);

      alert('¡Gracias por calificarnos! Redireccionando a escenarios...');
      
      this.resetForm(); 

      // Redirección a la galería filtrando por categoría 'Escenario'
      this.router.navigate(['/gallery'], { 
        queryParams: { category: 'Escenario' } 
      });

    } catch (e) {
      console.error('Error:', e);
      alert('Error al enviar.');
    }
  }

  // Limpia el formulario y resetea el estado visual
  private resetForm() {
    this.ratingForm.reset({ 
      nickname: '',
      scenario: null, 
      rating: null, 
      comment: ''
    });
    this.currentRating = 0;
    this.selectedScenario = null;
  }
}