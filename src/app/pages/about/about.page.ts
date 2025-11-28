import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class AboutPage implements OnInit {

  teamMembers = [
    {
      name: 'DREAM TEAM',
      role: 'THE DREAM TEAM',
      description: 'Desarrolladores en proceso, puro XP compa viejon yiiiiiiiiiiijaaaaa!',
      image: 'assets/galeria/dreamteam.jpeg'
    },
    {
      name: ' ISHHHH STUDIOS',  
      role: '¿Quienes somos?',
      description: 'Somos un equipo con un solo propósito, cumplir siempre con el objetivo',
      image: 'assets/galeria/logotipoo.jpeg' 
    },
    {
      name: '9 VIDAS',
      role: 'Esquema de Trabajo',
      description: 'Proceso del proyecto realizado con Angular/Ionic/Unity/Firebase',
      image: 'assets/galeria/poster.jpeg' 
    },
    
    
  ];

  constructor() { }

  ngOnInit() {
  }

}