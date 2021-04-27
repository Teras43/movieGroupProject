import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WatchListService } from '../../services/watch-list.service';
import { User } from '../../interfaces/user';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { DataShareService } from 'src/app/services/data-share.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails;
  trailerVar: any;
  moviePopRound: number;
  title: any;
  docId;
  isAddedVar;
  updateDate = [];
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;
  user: User[] = [];
  buttonDisabled: boolean = false;
  watchListMovie$;
  interested = [];

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public watchListService: WatchListService,
    private dialog: MatDialog,

    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(res => {
      this.dataShare.movieId = res.id;
      this.setData();
    });
  }

  ngOnInit(): void {
    // this.setData();
    // console.log(this.watchListService.userData);
    this.watchListService.updateUser;
  }

  setData = () => {
    try {
      this.apiData.getSelectedMovieData(this.dataShare.movieId)
    } finally {
      this.apiData.getSelectedMovieData(this.dataShare.movieId).subscribe(res => {
        this.movieDetails = res;
        console.log('Details: ', this.movieDetails);
        // this.watchListService.getWatchListMovies();
        this.updateData();
      });
    }
    // this.watchListMovie.push({
    //   title: this.movieDetails.title,
    //   vote_average: this.movieDetails.vote_average,
    //   poster_path: this.movieDetails.poster_path,
    // })
  };

  updateData = () => {
    try {
      this.setTrailer();
      this.moviePopRound = Math.round(this.movieDetails.popularity);
      this.movieDetails.reviews.results.forEach((result) => {
        this.updateDate.push(new Date(result.updated_at));
      });
    } finally {
      // this.isAdded(this.movieDetails.title);
    }
  };

  // Having adblock on will cause web console errors, none will break the app so far. Trailer will still play fine without issues.

  getUpdateDate = (updateStr) => {
    let newUpdate = new Date(updateStr);
    return newUpdate;
  };

  setTrailer = async () => {
    if (this.movieDetails.videos.results.length !== 0) {
      this.trailerVar = await this.movieDetails.videos.results[0].key;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.trailerVar}`
      );
    } else {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.trailerVar}`
      );
    }
  };

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: this.movieDetails.title,
      //   rating: 0
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output: ', data));
  };

  isLoaded = () => {
    if (this.movieDetails !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  // isAdded = (title) => {
  //   this.user.forEach(movie => {
  //     if(movie.interested[title] === title) {
  //       this.isAddedVar = true;
  //     } else {
  //       this.isAddedVar = false;
  //     };
  //   });
  // };

  addToWatchList = async () => {
    await this.interested.push({
      title: this.movieDetails.title,
      vote_average: this.movieDetails.vote_average,
      poster_path: this.movieDetails.poster_path,
    });
    let subscription = this.watchListService.users.subscribe((res) => {
      res.forEach((item) => {
        this.watchListService.docId = item.payload.doc.id;
        // console.log(item, 'wack')
      });

      res.forEach(() => {
        this.watchListService.updateUser(this.interested);
      });
      subscription.unsubscribe();
    });
  };

  // removeWatchList = (title) => {
  //   console.log(this.user);
  //   if ( this.isAddedVar = true) {
  //     let index = this.user.indexOf(title);
  //     this.user.splice(index, 1);
  //     this.isAddedVar = false;
  //   } else {
  //     console.log("Nope.");
  //     return
  //   };
  // };

  peopleNav = async (personId) => {
    this.dataShare.personId = await personId;
    this.router.navigate([`/people/${personId}`], { queryParams: {
      id: personId,
    } });
  }

  selectMovie = async (movieId) => {
    this.dataShare.movieId = await movieId;
    this.router.navigate([`/movie/${movieId}`], { queryParams: {
      id: movieId
    } });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
}
