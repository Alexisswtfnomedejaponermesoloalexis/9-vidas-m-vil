import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define la estructura de datos para los ítems de la galería
export interface GalleryItem {
  id?: string;
  nombre: string;
  info: string;
  imagen: string;
  history: string;
  category: string; 
}

// Define la estructura para guardar calificaciones y comentarios
export interface Rating {
  nickname?: string;
  scenario: string;
  rating: number;
  comment: string;
  timestamp: any;
}

@Injectable({
  providedIn: 'root' // Servicio disponible globalmente en la app
})
export class GalleryService {

  // Inyectamos la instancia de Firestore para conectar con la BD
  constructor(private firestore: Firestore) { }

  // Obtiene la lista completa de ítems desde la colección 'galleryItems'
  getGalleryItems(): Observable<GalleryItem[]> {
    const galleryCollection = collection(this.firestore, 'galleryItems');
    return collectionData(galleryCollection, { idField: 'id' }) as Observable<GalleryItem[]>;
  }

  // Filtra y obtiene únicamente los ítems que son 'Escenarios'
  getScenariosOnly(): Observable<GalleryItem[]> {
    const galleryCollection = collection(this.firestore, 'galleryItems');
    
    // Consulta condicional: Trae solo donde la categoría sea igual a 'Escenario'
    const scenariosQuery = query(galleryCollection, where('category', '==', 'Escenario'));
    
    return collectionData(scenariosQuery, { idField: 'id' }) as Observable<GalleryItem[]>;
  }

  // Busca las calificaciones que pertenezcan a un escenario específico por su nombre
  getRatingsByScenario(scenarioName: string): Observable<Rating[]> {
    const ratingsRef = collection(this.firestore, 'ratings');
    
    // Consulta condicional: Filtra donde el campo 'scenario' coincida con el nombre recibido
    const q = query(ratingsRef, where('scenario', '==', scenarioName));
    
    return collectionData(q, { idField: 'id' }) as Observable<Rating[]>;
  }
}