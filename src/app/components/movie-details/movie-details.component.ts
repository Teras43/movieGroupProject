import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WatchListService } from '../../services/watch-list.service';
import { User } from '../../interfaces/user';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { DataShareService } from 'src/app/services/data-share.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails;
  currentUser;
  isAddedVar;
  getUsersVar;
  trailerVar: any;
  moviePopRound: number;
  title: any;
  updateDate = [];
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;
  user: User[] = [];
  buttonDisabled: boolean = false;
  watchListMovie$;
  movieData = [];

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public watchListService: WatchListService,
    private dialog: MatDialog,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(res => {
      this.dataShare.movieId = res.id;
      this.setData();
    });
  }

  ngOnInit(): void {
    this.watchListService.getUser();
    this.parseUserInfo();
  }

  ngOnDestroy(): void {
    this.watchListService.getUserVar = [];
  }

  parseUserInfo = async () => {
    await this.fireAuth.user.subscribe(data => {
      this.currentUser = data
    });
    setTimeout(() => {
      this.watchListService.docId = this.currentUser.uid;
    }, 300);
  }

  setData = () => {
    try {
      this.getUsersVar = this.watchListService.getUserVar;
      this.apiData.getSelectedMovieData(this.dataShare.movieId)
    } finally {
      this.apiData.getSelectedMovieData(this.dataShare.movieId).subscribe(res => {
        this.movieDetails = res;
        console.log('Details: ', this.movieDetails);
        // this.watchListService.getWatchListMovies();
        this.updateData();
      });
    }
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
    await this.movieData.push({
      title: this.movieDetails.title,
      vote_average: this.movieDetails.vote_average,
      poster_path: this.movieDetails.poster_path,
    });
    let subscription = this.watchListService.users.subscribe((res) => {
      res.forEach((item) => {
        this.watchListService.updateUser(this.movieData);
      });
      subscription.unsubscribe();
    });
    // Line 159 might need to be removed. Haven't check this.
    this.movieData = [];
  };

  removeWatchList = (title) => {
    try {
      this.watchListService.getUserVar.forEach(user => {
        if (user.id === this.currentUser.uid) {
          user.data.interested.forEach(movie => {
            if (movie.title === title) {
              this.watchListService.deleteInterestedMovie({movie});
            };
          });
        }
      });
    } finally {
      this.watchListService.getUserVar = [];
      console.log(this.watchListService.getUserVar);
    }
  };

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
