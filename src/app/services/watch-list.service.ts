import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'firebase/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  rating;
  docId;
  getUserVar = [];
  users: Observable<any>;
  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.usersRef = this.db.collection<User>('users');
    this.users = this.usersRef.snapshotChanges();
  }

  getUser = async (): Promise<any> => {
    await this.db.collection('users').get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.getUserVar.push({id: doc.id, data: doc.data()}); 
      });
    });
  };

  updateUser = async (movieData) => {
    this.db
      .collection('users')
      .doc(this.docId)
      .update({
        interested: firebase.firestore.FieldValue.arrayUnion(movieData[0]),
      });
  };

  deleteInterestedMovie = async (movieData) => {
    this.db.collection('users').doc(this.docId).update({interested: firebase.firestore.FieldValue.arrayRemove(movieData.movie)});
  };
}
