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
  nickname?: string;
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

  getScenariosOnly(): Observable<GalleryItem[]> {
    const galleryCollection = collection(this.firestore, 'galleryItems');
    
   
    const scenariosQuery = query(galleryCollection, where('category', '==', 'Escenario'));
    
    return collectionData(scenariosQuery, { idField: 'id' }) as Observable<GalleryItem[]>;
  }
  getRatingsByScenario(scenarioName: string): Observable<Rating[]> {
    const ratingsRef = collection(this.firestore, 'ratings');
    
    const q = query(ratingsRef, where('scenario', '==', scenarioName));
    
    return collectionData(q, { idField: 'id' }) as Observable<Rating[]>;
  }
}