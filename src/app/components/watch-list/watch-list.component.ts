import { Component, ComponentFactoryResolver, OnInit,  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListService } from '../../services/watch-list.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { ApiDataService } from '../../services/api-data.service';
import { DataShareService } from '../../services/data-share.service';
import firebase from 'firebase/app'



@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  getUserVar = [];
  interestedUser = [];
  deleteUser = [];


  constructor(
    private watchListService: WatchListService,
    private db: AngularFirestore,
    public apiDataService: ApiDataService,
    public dataShareService: DataShareService,
   
  ) {
    this.dataShareService.parseUserInfo();
    
  }

  ngOnInit(): void {
    // this.dataShareService.parseUserInfo();
  this.watchListService.getUser().then(() => {
    this.yes()
  })

  // setTimeout(() =>{


  // },250)
  }


  // // use this! make a new function that runs this.
  yes() {
    this.watchListService.getUserVar.forEach((user) => {
      if (user.id === this.dataShareService.currentUser.uid) {
       
        this.interestedUser.push(user.data);
      } else {
        return;
      }
    });
  }
  deleteMovie = async (user) => {
    // this.deleteUser.push({movie: user})
    // this.watchListService.deleteInterestedMovie(this.deleteUser[0]);
    // await this.db.collection('users').doc(this.dataShareService.currentUser.uid).update({interested: firebase.firestore.FieldValue.arrayRemove(user)})
    // this.deleteUser = [];
    // this.watchListService.getUser().then(() => {
    //   this.yes()
    // })
        await this.db.collection('users').doc(this.dataShareService.currentUser.uid).update({interested: firebase.firestore.FieldValue.arrayRemove(user)})
        this.interestedUser.splice(user);
        
    
  }


  //then console.log(user)
}
