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
      name: ' ISHHHH STUDIOS',  
      role: '¿Quienes somos?',
      description: 'Somos un equipo con un solo propósito, cumplir siempre con el objetivo',
      image: 'assets/galeria/logo.jpeg' 
    },
    {
      name: '9 VIDAS',
      role: '¿Qué hacemos?',
      description: 'Aquí buscamos crear algo en que divertirte y entretenerte, si buscas matar un rato el tiempo, aquí es el lugar que buscas',
      image: 'assets/galeria/9vidas.jpeg' 
    },
    {
      name: 'Compañero 3',
      role: 'NOSOTROS',
      description: 'Estos somos nosotros, somos unos desarrolladores de software en proceso.',
      image: 'assets/galeria/us2.jpeg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}