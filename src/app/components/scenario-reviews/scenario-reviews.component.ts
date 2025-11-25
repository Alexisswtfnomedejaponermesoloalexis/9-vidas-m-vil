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

  @Input() scenarioName!: string; 
  ratings$!: Observable<Rating[]>;

  constructor(
    private modalCtrl: ModalController,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
  
    this.ratings$ = this.galleryService.getRatingsByScenario(this.scenarioName);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}