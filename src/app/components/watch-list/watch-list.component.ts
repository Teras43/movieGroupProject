import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListService } from '../../services/watch-list.service';
import { ApiDataService } from '../../services/api-data.service';
import { DataShareService } from '../../services/data-share.service';
import firebase from 'firebase/app'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RatingInterface } from 'src/app/interfaces';



@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  curRating: number;
  updateUserRating = [];
  getUserVar = [];
  interestedUser = [];
  deleteUser = [];

  ratingNumbers: RatingInterface[] = [
    { value: 10, tag: "(Masterpiece)"},
    { value: 9, tag: "(Amazing)"},
    { value: 8, tag: "(Great)"},
    { value: 7, tag: "(Good)"},
    { value: 6, tag: "(Fine)"},
    { value: 5, tag: "(Average)"},
    { value: 4, tag: "(Bad)"},
    { value: 3, tag: "(Very Bad)"},
    { value: 2, tag: "(Horrible)"},
    { value: 1, tag: "(Appalling)"},
  ];

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
  deleteReviewedMovie = async (user) => {
    await this.db.collection('users').doc(this.dataShareService.currentUser.uid).update({reviews: firebase.firestore.FieldValue.arrayRemove(user)})
    window.location.reload();
  }
  
  selectMovie = (movieId) => {
    this.dataShare.movieId = movieId;
    this.router.navigate([`/movie/${movieId}`], { queryParams: {
      id: movieId
    } });
  }

  updateRating = (title, id, poster_path, userRating) => {
    this.updateUserRating.push({title, id, poster_path, userRating});
    this.watchListService.checkRatingExisting(title, this.dataShare.currentUser.uid).then(() => {
      this.watchListService.updateRatedList(this.updateUserRating);
    }).then(() => {
      this.updateUserRating = [];
    })
  }
}
