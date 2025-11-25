import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { GalleryService, GalleryItem } from '../../services/gallery.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButtons, IonMenuButton, IonSelect, IonSelectOption]
})
export class RatingsPage implements OnInit {

  ratingForm!: FormGroup; 
  
  scenariosList: GalleryItem[] = [];
  selectedScenario: GalleryItem | null = null;

  maxStars: number = 5;
  currentRating: number = 0;
  hoverRating: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private galleryService: GalleryService 
  ) {}

  ngOnInit(): void {
    this.galleryService.getScenariosOnly().subscribe(res => {
      this.scenariosList = res;
    });

    this.ratingForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      scenario: [null, Validators.required],
      rating: [null, Validators.required], 
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onScenarioChange(event: any) {
    this.selectedScenario = event.detail.value;
  }

  setRating(rating: number) {
    this.currentRating = rating;
    this.ratingForm.get('rating')?.setValue(rating);
  }

  starEnter(rating: number) {
    this.hoverRating = rating;
  }

  starLeave() {
    this.hoverRating = 0;
  }

  getStarColor(star: number): string {
    const activeRating = this.hoverRating || this.currentRating;
    return star <= activeRating ? '#ffc72c' : '#4a4a58'; 
  }
  
  async onSubmit() {
    if (!this.ratingForm.valid) {
      alert('Por favor, completa todos los campos.');
      this.ratingForm.markAllAsTouched();
      return;
    }

    const scenarioObject = this.ratingForm.value.scenario;

    const ratingData = {
      nickname: this.ratingForm.value.nickname,
      scenario: scenarioObject.nombre, 
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment,
      timestamp: new Date()
    };

    try {
      const ratingsCollection = collection(this.firestore, 'ratings');
      await addDoc(ratingsCollection, ratingData);

      alert('¡Gracias por tu calificación!');
      this.resetForm(); 

    } catch (e) {
      console.error('Error:', e);
      alert('Error al enviar.');
    }
  }

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