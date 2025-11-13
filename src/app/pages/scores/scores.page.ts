// Importaciones básicas de Angular y módulos de Ionic necesarios para la página
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

// Define la estructura de datos que representa cada marcador
interface ScoreEntry {
  rank: number;  // Posición del jugador en el ranking
  name: string;  // Nombre del jugador
  score: number; // Puntaje obtenido
  time: string;  // Tiempo de juego o supervivencia
}

@Component({
  selector: 'app-scores', // Nombre del componente usado en el HTML
  templateUrl: './scores.page.html', // Archivo HTML asociado
  styleUrls: ['./scores.page.scss'], // Archivo de estilos asociado
  standalone: true, // Permite usar el componente sin módulo principal
  imports: [ // Módulos y componentes usados dentro de la página
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonButtons, 
    IonMenuButton
  ]
})
export class ScoresPage implements OnInit {
  // Arreglo con datos de ejemplo para mostrar los marcadores
  scores: ScoreEntry[] = [
    { rank: 1, name: 'NARANJOSO_GOD', score: 99999, time: '30:00' },
    { rank: 2, name: 'ElMishi', score: 85210, time: '28:45' },
    { rank: 3, name: 'PixelPro', score: 77777, time: '25:12' },
    { rank: 4, name: 'GatoPardo', score: 65432, time: '22:05' },
    { rank: 5, name: 'BugHunter', score: 50111, time: '18:59' },
    { rank: 6, name: 'Player69', score: 45000, time: '17:30' },
    { rank: 7, name: 'Anon_Dev', score: 33200, time: '15:00' },
  ];

  constructor() { } // Constructor vacío, reservado para futuras dependencias o servicios

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta al iniciar la página
    // ESPERANDO CONEXIÓN AL SDK FIREBASE PARA EL VIDEOJUEGO EN UNITY
  }

}
