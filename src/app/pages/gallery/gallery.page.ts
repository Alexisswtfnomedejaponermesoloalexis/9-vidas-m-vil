 /*
  Este código corresponde a la página "Gallery" (Galería) de una aplicación Ionic + Angular.
  Su función es mostrar una galería de elementos obtenidos desde un servicio, y abrir un modal 
  con los detalles de cada imagen o elemento al seleccionarlo.
*/

// Importa los módulos y componentes necesarios de Angular e Ionic
import { Component, OnInit } from '@angular/core'; // Permite crear componentes y usar el ciclo de vida OnInit
import { CommonModule } from '@angular/common'; // Módulo común con directivas básicas de Angular (ngIf, ngFor)
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, ModalController } from '@ionic/angular/standalone'; 
// Importa los componentes de la interfaz de Ionic como contenido, encabezado, barra de herramientas y controlador de modales
import { Observable } from 'rxjs'; // Permite trabajar con flujos de datos asincrónicos

// Importa el servicio que maneja los datos de la galería y el tipo de dato de cada elemento
import { GalleryService, GalleryItem } from '../../services/gallery.service';

// Importa el componente que muestra los detalles de un elemento en un modal
import { GalleryDetailComponent } from '../../components/gallery-detail/gallery-detail.component';

@Component({
  selector: 'app-gallery', // Nombre con el que se identifica el componente en el HTML
  templateUrl: './gallery.page.html', // Ruta del archivo HTML asociado a la página
  styleUrls: ['./gallery.page.scss'], // Archivo con los estilos CSS o SCSS de la página
  standalone: true, // Indica que este componente no depende de un módulo específico
  imports: [ // Lista de módulos y componentes que este componente necesita
    CommonModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton,
    GalleryDetailComponent // Se incluye el componente del detalle de galería
  ]
})
export class GalleryPage implements OnInit { // Define la clase principal de la página de galería

  // Declara una variable que contendrá los elementos de la galería como un flujo de datos (Observable)
  public galleryItems$!: Observable<GalleryItem[]>;

  // Constructor: inyecta el servicio de galería y el controlador de modales
  constructor(private galleryService: GalleryService, private modalCtrl: ModalController) { }

  // Método que se ejecuta al iniciar la página
  ngOnInit() {
    // Llama al servicio para obtener los elementos de la galería y los guarda en la variable
    this.galleryItems$ = this.galleryService.getGalleryItems();
  }

  // Método asincrónico para abrir un modal con los detalles de un elemento seleccionado
  async openDetailModal(item: GalleryItem) {
    // Crea el modal usando el componente de detalle de galería
    const modal = await this.modalCtrl.create({
      component: GalleryDetailComponent, // Componente que se mostrará dentro del modal
      componentProps: {
        item: item // Envía el elemento seleccionado al modal
      },
      cssClass: 'pixel-modal' // Clase CSS personalizada para el diseño del modal
    });
    
    // Muestra el modal en pantalla
    await modal.present();
  }

}
