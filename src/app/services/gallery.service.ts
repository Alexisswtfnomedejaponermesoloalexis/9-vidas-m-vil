import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface GalleryItem {
  id?: string;
  nombre: string;
  info: string;
  imagen: string;
  history: string;
  category?: string; 
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
}