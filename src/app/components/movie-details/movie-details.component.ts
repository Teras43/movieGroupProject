import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WatchListService } from '../../services/watch-list.service';
import { WatchListMovie } from '../../interfaces'
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId;
  movieDetails;
  trailerVar;
  moviePopRound;
  updateDate = [];
  isAddedVar;
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;
  interestedMovies: WatchListMovie[] = [];

  constructor(
    public apiData: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchListService: WatchListService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.movieId = res.id;
      this.apiData.getSelectedMovieData(this.movieId);
    })
    setTimeout(() => {
      this.isAdded(this.apiData.apiSelectedMovieData.title);
      this.setData();
    }, 200);
  }
  
  // Having adblock on will cause web console errors, none will break the app so far. Trailer will still play fine without issues.
  
  setData = () => {
    this.movieDetails = this.apiData.apiSelectedMovieData;
    setTimeout(() => {
      this.movieDetails.reviews.results.forEach(result => {
        this.updateDate.push(new Date(result.updated_at));
      })
      this.moviePopRound = Math.round(this.movieDetails.popularity)
      this.setTrailer();
      console.log(this.movieDetails)
    }, 100);

  }

  getUpdateDate = (updateStr) => {
    let newUpdate = new Date(updateStr);
    return newUpdate;
  }

  setTrailer = () => {
    this.trailerVar = this.movieDetails.videos.results[0].key;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerVar}`);
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

  isLoaded = () => {
    if (this.moviePopRound !== undefined) {
      return true
    } else {
      return false
    };
  };

  isAdded = (title) => {
    this.interestedMovies.forEach(movie => {
      if(movie.title === title) {
        console.log('true');
        this.isAddedVar = true;
      } else {
        console.log('false');
        this.isAddedVar = false;
      };
    });
  };
  
  addToWatchList = () => {
    this.interestedMovies.push({
      title: this.movieDetails.title,
      vote_average: this.movieDetails.vote_average,
      poster_path: this.movieDetails.poster_path,
    });
    console.log(this.interestedMovies, "wack")
    this.interestedMovies.forEach(data => {
      this.watchListService.addToWatch(data)
    });
    this.isAdded(this.movieDetails.title);
  };


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

}
