import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { GalleryService, Rating } from '../../services/gallery.service';

@Component({
  selector: 'app-scenario-reviews',
  templateUrl: './scenario-reviews.component.html',
  styleUrls: ['./scenario-reviews.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonItem, IonLabel, IonIcon]
})
export class ScenarioReviewsComponent implements OnInit {

  // Recibe el nombre del escenario desde el componente padre (Galería)
  @Input() scenarioName!: string; 
  
  // Observable que contendrá la lista de reseñas traídas de Firebase
  ratings$!: Observable<Rating[]>;

  constructor(
    private modalCtrl: ModalController, // Controlador para cerrar el modal
    private galleryService: GalleryService // Servicio para obtener los datos
  ) { }

  ngOnInit() {
    // Al iniciar, consulta al servicio las reseñas filtradas por este escenario
    this.ratings$ = this.galleryService.getRatingsByScenario(this.scenarioName);
  }

  // Función para cerrar la ventana modal actual
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Helper para generar un array numérico y poder iterar las estrellas en el HTML
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}