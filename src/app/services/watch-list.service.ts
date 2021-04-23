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
<<<<<<< HEAD
  userData = [];
=======
  rating;
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767

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
