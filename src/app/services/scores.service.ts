import { Injectable } from '@angular/core';
import { Database, ref, listVal, query, orderByChild, limitToLast } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

// Define la estructura exacta de los datos que se guardan en la Realtime Database
export interface ScoreEntry {
  usuario: string; 
  score: number;
  tiempo: number;
  enemigos: number;
  nivel: number;
}

@Injectable({
  providedIn: 'root'
})
export class Scores {

  // Inyectamos 'Database' (Firebase Realtime Database)
  constructor(private db: Database) { }

  // Obtiene los 10 mejores puntajes ordenados de mayor a menor
  getTopScores(): Observable<ScoreEntry[]> {
    // Referencia a la ruta 'scores' en la base de datos
    const scoresRef = ref(this.db, 'scores');
    
    // Crea la consulta: Ordena por el campo 'score' y toma los últimos 10
    // (Firebase ordena ascendente, por eso los "últimos" son los más altos)
    const topScoresQuery = query(scoresRef, orderByChild('score'), limitToLast(10));

    // Convierte la consulta en un Observable y transforma los datos
    return listVal<ScoreEntry>(topScoresQuery).pipe(
      map(scores => {
        // Invertimos el array (.reverse) para que el puntaje más alto aparezca primero en la lista (descendente)
        return scores ? scores.reverse() : [];
      })
    );
  }
}