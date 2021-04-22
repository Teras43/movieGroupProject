import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {WatchListMovie} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  constructor(private db: AngularFirestore) { }
  
  addToWatch(watchListMovie: WatchListMovie): any{
    this.db.collection('interested').add(watchListMovie)
  }

}
