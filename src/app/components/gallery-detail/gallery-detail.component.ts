/* Este código controla la lógica del modal. 
   Recibe los datos del item que se mostrará en el modal 
   (como nombre, imagen, info e historia) y permite cerrarlo. */

import { Component, Input } from '@angular/core'; // Importa decoradores y utilidades básicas de Angular
import { CommonModule } from '@angular/common'; // Importa funciones comunes (ngIf, ngFor, etc.)
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, ModalController } from '@ionic/angular/standalone'; 
// Importa componentes de Ionic que se usan en el HTML
import { GalleryItem } from '../../services/gallery.service'; // Importa el modelo que define la estructura de los items

@Component({
  selector: 'app-gallery-detail', // Nombre del componente para usarlo en el HTML
  templateUrl: './gallery-detail.component.html', // Archivo HTML del modal
  styleUrls: ['./gallery-detail.component.scss'], // Archivo de estilos del modal
  standalone: true, // Indica que este componente no depende de un módulo
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons] // Componentes importados para usar en el template
})
export class GalleryDetailComponent {

  @Input() item!: GalleryItem; // Recibe los datos del item desde el componente padre (por ejemplo, la galería)

  constructor(private modalCtrl: ModalController) { } // Inyecta el controlador del modal para poder cerrarlo

  closeModal() {
    this.modalCtrl.dismiss(); // Cierra el modal cuando se llama esta función
  }
}
