import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListService } from '../../services/watch-list.service';
import { ApiDataService } from '../../services/api-data.service';
import { DataShareService } from '../../services/data-share.service';
import firebase from 'firebase/app'
import { Location } from '@angular/common';
import { Router } from '@angular/router';



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
    public location: Location,
    public dataShare: DataShareService,
    private router: Router,
   
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
  
    this.watchListService.deleteInterestedMovie(this.deleteUser[0]).then(() => {
      this.deleteUser = [];
      window.location.reload();
    });
  }
  deleteRatedMovie =(user) => {
    this.deleteUser.push({movie: user})
    this.watchListService.deleteRatedMovie(this.deleteUser[0]).then(()=>{
      this.deleteUser = [];
      window.location.reload();

    })
  }
  // deleteReviewedMovie = async (user) => {
  //   this.deleteUser.push({movie: user})
  //   this.db.collection('users').doc(this.dataShareService.currentUser.uid).update({reviews: firebase.firestore.FieldValue.arrayRemove(user)})
  //   this.deleteUser = [];
  //   window.location.reload();
  // }
  
  selectMovie = (movieId) => {
    this.dataShare.movieId = movieId;
    this.router.navigate([`/movie/${movieId}`], { queryParams: {
      id: movieId
    } });
  }
}
