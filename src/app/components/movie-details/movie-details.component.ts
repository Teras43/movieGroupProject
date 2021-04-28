import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WatchListService } from '../../services/watch-list.service';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { DataShareService } from 'src/app/services/data-share.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails;
  currentUser;
  isAddedVar;
  trailerVar: any;
  moviePopRound: number;
  updateDate = [];
  movieData = [];
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;

  // Subscription Variables
  private actQueryParams: Subscription;
  private parseUserSub: Subscription;
  
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
    this.actQueryParams = this.activatedRoute.queryParams.subscribe(res => {
      this.watchListService.getUser();
      this.dataShare.movieId = res.id;
      this.setData();
      this.apiData.getSelectedMovieData(res.id).subscribe(res2 => {
        this.watchListService.checkTitle(res2.title, this.currentUser.uid);
      });
    });
  }
  
  ngOnInit(): void {
    this.parseUserInfo();
  };

  ngOnDestroy(): void {
    this.watchListService.getUserVar = [];
    this.movieData = [];
    this.actQueryParams.unsubscribe();
    this.parseUserSub.unsubscribe();
  };

  parseUserInfo = async () => {
    this.parseUserSub = await this.fireAuth.user.subscribe(data => {
      this.currentUser = data
    });
    setTimeout(() => {
      this.watchListService.docId = this.currentUser.uid;
    }, 300);
  };

  setData = () => {
    try {
      this.apiData.getSelectedMovieData(this.dataShare.movieId).subscribe(res => {
        this.movieDetails = res;
        console.log('Details: ', this.movieDetails);
        this.updateData();
      });
    } finally {
      return
    };
  };
  
  updateData = () => {
    try {
      this.setTrailer();
      this.moviePopRound = Math.round(this.movieDetails.popularity);
      this.movieDetails.reviews.results.forEach((result) => {
        this.updateDate.push(new Date(result.updated_at));
      });
    } finally {
      this.moviePopRound = Math.round(this.movieDetails.popularity);
      this.movieDetails.reviews.results.forEach((result) => {
        this.updateDate.push(new Date(result.updated_at));
      });
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

    dialogRef.afterClosed();
  };

  isLoaded = () => {
    if (this.movieDetails !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  addToWatchList = async () => {
    try {
      this.movieData.push({
        title: this.movieDetails.title,
        vote_average: this.movieDetails.vote_average,
        poster_path: this.movieDetails.poster_path,
      });
      // console.log("here");
      await this.watchListService.getUserVar.forEach(user => {
        if (user.id === this.currentUser.uid) {
          if (user.data.interested.length === 0) {
            this.watchListService.updateUser(this.movieData);
          }
          user.data.interested.forEach(movie => {
            if (movie.title !== this.movieDetails.title) {
              this.watchListService.updateUser(this.movieData);
            }
          })
        };
      });
    } finally {
      this.watchListService.checkTitle(this.movieDetails.title, this.currentUser.uid);
      this.movieData = [];
    }
  };

  removeWatchList = async (title) => {
    try {
      await this.watchListService.getUserVar.forEach(user => {
        if (user.id === this.currentUser.uid) {
          user.data.interested.forEach(movie => {
            if (movie.title === title) {
              this.watchListService.deleteInterestedMovie({movie});
            };
          });
        }
      });
    } finally {
      this.watchListService.checkTitle(this.movieDetails.title, this.currentUser.uid);
    }
  };

  peopleNav = async (personId) => {
    this.dataShare.personId = await personId;
    this.router.navigate([`/people/${personId}`], {
      queryParams: {
        id: personId,
      },
    });
  };

  selectMovie = async (movieId) => {
    this.dataShare.movieId = await movieId;
    this.router.navigate([`/movie/${movieId}`], {
      queryParams: {
        id: movieId,
      },
    });
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
}
