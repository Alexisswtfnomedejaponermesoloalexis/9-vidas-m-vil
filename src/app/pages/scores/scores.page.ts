import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Scores, ScoreEntry } from '../../services/scores.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
  standalone: true, // Indica que es un componente autónomo (sin módulos)
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton] // Importa componentes visuales de Ionic
})
export class ScoresPage implements OnInit {

  // Variable Observable para manejar el flujo de datos de los puntajes
  scores$!: Observable<ScoreEntry[]>;

  // Inyectamos el servicio de Scores para poder usar sus funciones
  constructor(private scoresService: Scores) { }

  ngOnInit() {
    // Al iniciar la página, obtenemos los mejores puntajes del servicio
    this.scores$ = this.scoresService.getTopScores();
  }

  // Función auxiliar para convertir segundos a formato "minutos:segundos"
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60); // Calcula los minutos enteros
    const secs = Math.floor(seconds % 60); // Calcula los segundos restantes
    
    // Retorna el string formateado (ej: "1:05"), agregando un 0 si los segundos son menores a 10
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}