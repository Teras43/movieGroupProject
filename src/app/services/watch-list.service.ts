import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListMovie } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  constructor(public db: AngularFirestore) {}

  addToWatch(watchListMovie: WatchListMovie): any {
    this.db.collection('users').add(watchListMovie);
  }
//   getWatchListMovies(title: string): Observable<WatchListMovie[]> {
//     return this.db.collection('users').valueChanges().pipe(map() => );
//   }
}
