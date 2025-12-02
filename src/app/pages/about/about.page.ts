/*
  ABOUT.PAGE.TS (Lógica de la página 'Nosotros')
  
  Este componente gestiona la información estática sobre el equipo de desarrollo
  y el proyecto "9 Vidas". Define los datos que se mostrarán en las tarjetas.
*/

// Importaciones de Angular y componentes visuales de Ionic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about', // Selector para usar este componente
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true, // Componente autónomo (sin módulos)
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class AboutPage implements OnInit {

  // Arreglo de objetos que contiene la información a mostrar en la vista.
  // Cada objeto representa una tarjeta (Card) en el HTML.
  teamMembers = [
    {
      name: 'DREAM TEAM',
      role: 'THE DREAM TEAM',
      description: 'Desarrolladores en proceso, puro XP compa viejon yiiiiiiiiiiijaaaaa!',
      image: 'assets/galeria/dreamteam.jpeg' // Ruta local de la imagen del equipo
    },
    {
      name: ' ISHHHH STUDIOS',  
      role: '¿Quienes somos?',
      description: 'Somos un equipo con un solo propósito, cumplir siempre con el objetivo',
      image: 'assets/galeria/logotipoo.jpeg' // Ruta local del logotipo
    },
    {
      name: '9 VIDAS',
      role: 'Esquema de Trabajo',
      description: 'Proceso del proyecto realizado con Angular/Ionic/Unity/Firebase',
      image: 'assets/galeria/poster.jpeg' // Ruta local del póster
    },
  ];

  constructor() { }

  // Ciclo de vida de inicialización (vacío porque los datos son estáticos y no requieren carga externa)
  ngOnInit() {
  }

}