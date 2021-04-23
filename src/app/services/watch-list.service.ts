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
  userData = [];
  rating;

  constructor(public db: AngularFirestore) {}
  

  addToWatch(watchListMovie: WatchListMovie): any {
    this.db.collection('users').add(watchListMovie);
  }
  getWatchListMovies() {
    return this.db.collection('users').get().toPromise().then((querySnapshot) =>{
      querySnapshot.forEach((doc) => {
        this.userData.push({
          id: doc.id,
          data: doc.data()
        })
      });
    });

}
}
