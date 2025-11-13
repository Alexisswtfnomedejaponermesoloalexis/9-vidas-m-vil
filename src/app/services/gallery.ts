// Permite que el servicio sea inyectable en otros componentes o servicios
import { Injectable } from '@angular/core';

// Importa las funciones necesarias para trabajar con Firestore (base de datos de Firebase)
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define la estructura (modelo) de un elemento dentro de la galería
export interface GalleryItem {
  id?: string;     // ID opcional generado por Firestore
  nombre: string;  // Nombre del elemento o personaje
  info: string;    // Información o descripción del elemento
  imagen: string;  // URL de la imagen
  category?: string; // Categoría opcional del elemento (ej. protagonista, enemigo, etc.)
  history: string; // Historia o detalle adicional
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible de forma global en toda la app
})
export class GalleryService {

  // Inyecta la conexión con Firestore para poder acceder a la base de datos
  constructor(private firestore: Firestore) { }

  // Obtiene todos los elementos de la colección 'galleryItems' en Firestore
  getGalleryItems(): Observable<GalleryItem[]> {
    // Referencia a la colección 'galleryItems' en la base de datos
    const galleryCollection = collection(this.firestore, 'galleryItems');

    // Retorna los datos de la colección como un Observable que emite actualizaciones en tiempo real
    return collectionData(galleryCollection, { idField: 'id' }) as Observable<GalleryItem[]>;
  }
}
