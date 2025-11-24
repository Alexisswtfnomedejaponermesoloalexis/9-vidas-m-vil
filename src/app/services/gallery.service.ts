import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface GalleryItem {
  id?: string;
  nombre: string;
  info: string;
  imagen: string;
  history: string;
  category: string; 
}
export interface Rating {
  scenario: string;
  rating: number;
  comment: string;
  timestamp: any;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private firestore: Firestore) { }

  getGalleryItems(): Observable<GalleryItem[]> {
    const galleryCollection = collection(this.firestore, 'galleryItems');
    return collectionData(galleryCollection, { idField: 'id' }) as Observable<GalleryItem[]>;
  }

  // --- NUEVA FUNCIÓN: TRAER SOLO ESCENARIOS ---
  getScenariosOnly(): Observable<GalleryItem[]> {
    const galleryCollection = collection(this.firestore, 'galleryItems');
    
    // Creamos una consulta (Query): "Trae donde 'category' sea igual a 'Escenario'"
    // IMPORTANTE: Asegúrate de que en tu Firebase la categoría esté escrita exactamente "Escenario"
    const scenariosQuery = query(galleryCollection, where('category', '==', 'Escenario'));
    
    return collectionData(scenariosQuery, { idField: 'id' }) as Observable<GalleryItem[]>;
  }
  getRatingsByScenario(scenarioName: string): Observable<Rating[]> {
    const ratingsRef = collection(this.firestore, 'ratings');
    
    // Hacemos una Query: "Dame los ratings donde el campo 'scenario' sea igual al nombre que te paso"
    const q = query(ratingsRef, where('scenario', '==', scenarioName));
    
    return collectionData(q, { idField: 'id' }) as Observable<Rating[]>;
  }
}