import { Injectable } from '@angular/core';
import { Database, ref, listVal, query, orderByChild, limitToLast } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

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

  constructor(private db: Database) { }

  getTopScores(): Observable<ScoreEntry[]> {
    const scoresRef = ref(this.db, 'scores');
    
    const topScoresQuery = query(scoresRef, orderByChild('score'), limitToLast(10));

    return listVal<ScoreEntry>(topScoresQuery).pipe(
      map(scores => {
        return scores ? scores.reverse() : [];
      })
    );
  }
}