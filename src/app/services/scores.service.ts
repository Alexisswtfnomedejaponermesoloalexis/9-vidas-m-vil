import { Injectable } from '@angular/core';
import { Database, ref, listVal, query, orderByChild, limitToLast } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

export interface ScoreEntry {
  usuario: string; // El nombre que pusiste en Unity ("Aleixis")
  score: number;
  tiempo: number;
  enemigos: number;
  nivel: number;
}

@Injectable({
  providedIn: 'root'
})
export class Scores {

  constructor(private db: Database) { }

  getTopScores(): Observable<ScoreEntry[]> {
    // 1. Referencia a la ruta "scores" en Realtime DB
    const scoresRef = ref(this.db, 'scores');
    
    // 2. Creamos la Query:
    //    - Ordenar por "score" (orderByChild)
    //    - Traer los últimos 10 (limitToLast), ya que ordena de menor a mayor
    const topScoresQuery = query(scoresRef, orderByChild('score'), limitToLast(10));

    // 3. Obtenemos la lista y la transformamos
    return listVal<ScoreEntry>(topScoresQuery).pipe(
      map(scores => {
        // Firebase devuelve los datos ordenados de menor a mayor.
        // Nosotros queremos el mayor primero, así que invertimos el array (.reverse())
        return scores ? scores.reverse() : [];
      })
    );
  }
}