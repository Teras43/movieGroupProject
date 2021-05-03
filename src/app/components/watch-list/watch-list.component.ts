import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListService } from '../../services/watch-list.service';
import { ApiDataService } from '../../services/api-data.service';
import { DataShareService } from '../../services/data-share.service';
import firebase from 'firebase/app'
import { Location } from '@angular/common';



@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  getUserVar = [];
  interestedUser = [];
  deleteUser = [];


  constructor(
    private watchListService: WatchListService,
    private db: AngularFirestore,
    public apiDataService: ApiDataService,
    public dataShareService: DataShareService,
    public location: Location
   
  ) {
    this.dataShareService.parseUserInfo();
    
  }

  ngOnInit(): void {
    this.watchListService.getUser().then(() => {
      this.getUserData()
    })
  }
   
  ngOnDestroy(): void {
    this.interestedUser = []
  }

  getUserData = ()  => {
    this.watchListService.getUserVar.forEach((user) => {
      if (user.id === this.dataShareService.currentUser.uid) {
       
        this.interestedUser.push(user.data);
      } else {
        return;
      }
    });
  }

  deleteMovie = (user) => {
    this.deleteUser.push({movie: user})
    console.log(this.deleteUser[0]);
    this.watchListService.deleteInterestedMovie(this.deleteUser[0]).then(() => {
      this.deleteUser = [];
      window.location.reload();
    });
  }
}
