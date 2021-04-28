import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  rating;
  docId;
  movieTitle: boolean;
  comparisonTitle = [];
  getUserVar = [];
  users: Observable<any>;
  private usersRef: AngularFirestoreCollection<User>;
  // private movieExistsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public existsObs: Observable<boolean> = this.movieExistsSubject.asObservable();

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
      await this.getUserVar.forEach(user => {
        if (user.id === userId) {
          user.data.interested.forEach(movie => {
            if (movie.title === movieTitle) {
              console.log("title: ", movieTitle);
              this.comparisonTitle.push(movieTitle);
            } else {
              return
            };
          });
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
      console.log(this.movieTitle);
    }
  };
}
