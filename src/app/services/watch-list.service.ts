import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListMovie } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  interested= [
   
  ];
  rating;

  constructor(public db: AngularFirestore) {}
  

  addToWatch(watchListMovie: WatchListMovie): any {
    this.db.collection('users').doc(uid).update({
      array: firebase.firestore.FieldValue.arrayUnion("value")
    })
    

<<<<<<< HEAD
    })
    // this.db.collection('users').add(watchListMovie);
=======
  getWatchListMovies = async () => {
    await this.db.collection('users').get().subscribe(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.userData.push({
          id: doc.id,
          data: doc.data()
        })
      });
    });
>>>>>>> cc65ca9eb3562aa4563a10a695db8b9926fdb7be
  };

  // getWatchListMovies() {
  //   return this.db.collection('users').get().toPromise().then((querySnapshot) =>{
  //     querySnapshot.forEach((doc) => {
  //       this.interested.push({
  //         title: ,
  //         data: doc.data()
  //       })
  //     });
  //   });
  // };
  // addToInterestedList(user){


  // }
}
