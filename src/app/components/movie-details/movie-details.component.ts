import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WatchListService } from '../../services/watch-list.service';
import { WatchListMovie } from '../../interfaces'
import { DialogComponent } from '../dialog/dialog.component';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: any;
  movieDetails;
  trailerVar: any;
  moviePopRound: number;
  title: any;
  docId;
  isAddedVar;
  updateDate = [];
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;
  watchListMovie: WatchListMovie[] = [];
  buttonDisabled: boolean = false;
  watchListMovie$;

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchListService: WatchListService,
    private dialog: MatDialog,
    private userData: WatchListService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(res => {
      this.movieId = res.id;
      this.setData();
    });
<<<<<<< HEAD
    // this.watchListService.getWatchListMovies();
=======
   };
  
  ngOnInit(): void {
    // this.setData();
>>>>>>> cc65ca9eb3562aa4563a10a695db8b9926fdb7be
    // console.log(this.watchListService.userData);
    // this.submitted();
  };

  setData = () => {
    try {
      this.apiData.getSelectedMovieData(this.movieId)
    } finally {
      this.apiData.getSelectedMovieData(this.movieId).subscribe(res => {
        this.movieDetails = res;
        console.log("Details: ", this.movieDetails)
        // this.watchListService.getWatchListMovies();
        this.updateData();
      });
    }
      // this.watchListMovie.push({
      //   title: this.movieDetails.title,
      //   vote_average: this.movieDetails.vote_average,
      //   poster_path: this.movieDetails.poster_path,
      // })
  }

  updateData = () => {
    try {
      this.setTrailer();
      this.moviePopRound = Math.round(this.movieDetails.popularity);
      this.movieDetails.reviews.results.forEach(result => {
        this.updateDate.push(new Date(result.updated_at));
      });
    } finally {
      this.isAdded(this.movieDetails.title);
    }
  }

  // Having adblock on will cause web console errors, none will break the app so far. Trailer will still play fine without issues.
  

  getUpdateDate = (updateStr) => {
    let newUpdate = new Date(updateStr);
    return newUpdate;
  };

  setTrailer = async () => {
    if (this.movieDetails.videos.results.length !== 0) {
      this.trailerVar = await this.movieDetails.videos.results[0].key;
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerVar}`);
    } else {
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerVar}`);
    }
  }

  openDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        title: this.movieDetails.title,
      //   rating: 0
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output: ", data)
    );
  };

  rateMovie = () => {
    console.log(this.userData)
  }

  isLoaded = () => {
    if (this.movieDetails !== undefined) {
      return true
    } else {
      return false
    };
  };


  isAdded = (title) => {
    this.watchListMovie.forEach(movie => {
      if(movie.title === title) {
        this.isAddedVar = true;
      } else {
        this.isAddedVar = false;
      };
    });
  };
  
  addToWatchList = () => {
    this.watchListMovie.forEach((data) =>{
      this.watchListService.addToWatch(data)
    })
    this.watchListMovie.push({
      title: this.movieDetails.title,
      vote_average: this.movieDetails.vote_average,
      poster_path: this.movieDetails.poster_path,
    });
    console.log(this.watchListMovie, "wack")
    this.isAdded(this.movieDetails.title);
  };

  removeWatchList = (title) => {
    console.log(this.watchListMovie);
    if ( this.isAddedVar = true) {
      let index = this.watchListMovie.indexOf(title);
      this.watchListMovie.splice(index, 1);
      this.isAddedVar = false;
    } else {
      console.log("Nope.");
      return
    };
  };

  peopleNav = (personId) => {
    this.router.navigate([`/people`], { queryParams: {
      id: personId,
    } });
  }

  selectMovie = (movieId) => {
    this.router.navigate([`/movie`], { queryParams: {
      id: movieId
    } });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

}
