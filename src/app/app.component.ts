import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, 
  IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, 
  archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
  bookmarkOutline, bookmarkSharp 
} from 'ionicons/icons';

@Component({
  selector: 'app-root', 
  templateUrl: 'app.component.html', 
  styleUrls: ['app.component.scss'], 
  imports: [
    RouterLink, RouterLinkActive, 
    IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, 
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet
  ],
})
export class AppComponent {

  public appPages = [
    { title: 'Galería', url: '/gallery', icon: 'images' },
    { title: 'Puntajes', url: '/scores', icon: 'trophy' },
    { title: 'Calificaciones', url: '/ratings', icon: 'star' },
    { title: 'Soporte', url: '/contact', icon: 'send' },
    { title: 'Nosotros', url: '/about', icon: 'people' },
  ];

  constructor() {
    addIcons({ 
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, archiveSharp, 
      trashOutline, trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp 
    });
  }
}
