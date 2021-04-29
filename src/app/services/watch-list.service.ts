import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  rating;
  docId;
  didRate: boolean;
  movieTitle: boolean;
  ratedComparison = [];
  comparisonTitle = [];
  getUserVar = [];
  userRating: Observable<number>;
  users: Observable<any>;
  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    public db: AngularFirestore,
  ) {
    this.usersRef = this.db.collection<User>('users');
    this.users = this.usersRef.snapshotChanges();
  }

  getUser = (): Promise<any> => {
    try {
      this.getUserVar = [];
    } finally {
      if(this.getUserVar.length === 0) {
        return this.db.collection('users').get().toPromise().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.getUserVar.push({id: doc.id, data: doc.data()}); 
          });
        });
      }
    }
  };

  updateInterestedMovie = async (movieData) => {
    await this.db
      .collection('users')
      .doc(this.docId)
      .update({
        interested: firebase.firestore.FieldValue.arrayUnion(movieData[0]),
      });
  };

  deleteInterestedMovie = async (movieData) => {
    await this.db.collection('users').doc(this.docId).update({interested: firebase.firestore.FieldValue.arrayRemove(movieData.movie)});
  };

  checkTitle = async (movieTitle, userId) => {
    if (this.getUserVar.length !== 0) {
      await this.getUser();
    }
    try {
      this.getUserVar.forEach(user => {
        if (user.id === userId) {
          try {
            user.data.interested.forEach(movie => {
              if (movie.title === movieTitle) {
                console.log("Movie Title Initial: ", movieTitle);
                this.comparisonTitle.push(movieTitle);
              }
            });
          } finally {
            user.data.rated.forEach(movie => {
              if (movie.title === movieTitle) {
                console.log("Movie title rated test: ", movieTitle);
                this.ratedComparison.push(movieTitle);
                this.userRating = of(movie.userRating);
                console.log("userRating = good");
                return
              } else {
                return
              }
            })
          }
        };
      });
    } finally {
      if (this.comparisonTitle.length !== 0) {
        this.movieTitle = true;
        this.comparisonTitle = [];
      } else {
        this.movieTitle = false;
        this.comparisonTitle = [];
      };
      if (this.ratedComparison.length !== 0) {
        this.didRate = true;
        this.ratedComparison = [];
      } else {
        this.didRate = false;
        this.userRating = of(undefined);
        this.ratedComparison = [];
      };
    }
  };

  updateRatedList = async (movieData) => {
    console.log("movieData: ", movieData);
    await this.db.collection('users').doc(this.docId).update({
      rated: firebase.firestore.FieldValue.arrayRemove(movieData[0])
    });
    await this.db
      .collection('users')
      .doc(this.docId)
      .update({
        rated: firebase.firestore.FieldValue.arrayUnion(movieData[0]),
      });
  };

  deleteRatedMovie = async (movieData) => {
    await this.db.collection('users').doc(this.docId).update({rated: firebase.firestore.FieldValue.arrayRemove(movieData.movie)});
  };
}
