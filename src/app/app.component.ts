// Importaciones principales de Angular y Ionic
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, 
  IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink 
} from '@ionic/angular/standalone';

// Importa función para registrar íconos y los íconos usados
import { addIcons } from 'ionicons';
import { 
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, 
  archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
  bookmarkOutline, bookmarkSharp 
} from 'ionicons/icons';

@Component({
  selector: 'app-root', // Selector principal del componente raíz
  templateUrl: 'app.component.html', // HTML asociado (estructura del menú y contenido principal)
  styleUrls: ['app.component.scss'], // Estilos del componente raíz
  imports: [
    RouterLink, RouterLinkActive, 
    IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, 
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet
  ],
})
export class AppComponent {

  // Lista de páginas que se muestran en el menú lateral
  public appPages = [
    { title: 'Galería', url: '/gallery', icon: 'images' },
    { title: 'Puntajes', url: '/scores', icon: 'trophy' },
    { title: 'Calificaciones', url: '/ratings', icon: 'star' },
    { title: 'Soporte', url: '/contact', icon: 'send' },
    { title: 'Nosotros', url: '/about', icon: 'people' },
  ];

  constructor() {
    // Registra los íconos usados en la aplicación para que estén disponibles en los componentes
    addIcons({ 
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, archiveSharp, 
      trashOutline, trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp 
    });
  }
}
