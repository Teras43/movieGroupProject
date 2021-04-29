import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  rating;
  docId;
  preUpdateMovie;
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

  getUser = async (): Promise<any> => {
    try {
      this.getUserVar = [];
    } finally {
      return await this.db.collection('users').get().toPromise().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.getUserVar.push({id: doc.id, data: doc.data()}); 
        });
      });
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
                this.comparisonTitle.push(movieTitle);
              }
            });
          } finally {
            user.data.rated.forEach(movie => {
              if (movie.title === movieTitle) {
                this.preUpdateMovie = {movie};
                this.ratedComparison.push(movieTitle);
                this.userRating = of(movie.userRating);
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

  checkRatingExisting = async (movieTitle, userId) => {
    await this.getUser();
    try {
      this.getUserVar.forEach(user => {
       if (user.id === userId) {
         user.data.rated.forEach(movie => {
           if (movie.title === movieTitle) {
              this.preUpdateMovie = {movie};
              this.ratedComparison.push(movieTitle);
              this.userRating = of(movie.userRating);
            }
          });
        }
      });
    } finally {
      if (this.ratedComparison.length !== 0) {
        this.didRate = true;
        this.ratedComparison = [];
      } else {
        this.didRate = false;
        this.userRating = of(undefined);
        this.ratedComparison = [];
      };
    }
  }

  updateRatedList = async (movieData) => {
    if (this.preUpdateMovie !== undefined) {
      await this.db.collection('users').doc(this.docId).update({
        rated: firebase.firestore.FieldValue.arrayRemove(this.preUpdateMovie.movie)
      });
    }
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
