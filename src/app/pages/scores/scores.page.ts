import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Scores, ScoreEntry } from '../../services/scores.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton]
})
export class ScoresPage implements OnInit {

  scores$!: Observable<ScoreEntry[]>;

  constructor(private scoresService: Scores) { }

  ngOnInit() {
    // Obtenemos los puntajes del servicio
    this.scores$ = this.scoresService.getTopScores();
  }

  // Función auxiliar para convertir los segundos a formato 00:00 (Opcional)
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}