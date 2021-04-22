import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;

  constructor(
    public apiData: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.movieId = res.id;
      this.apiData.getSelectedMovieData(this.movieId);
    })
    setTimeout(() => {
      this.setData();
    }, 500);
  }

  // Having adblock on will cause web console errors, none will break the app so far. Trailer will still play fine without issues.
  
  setData = () => {
    this.movieDetails = this.apiData.apiSelectedMovieData;
    setTimeout(() => {
      this.moviePopRound = Math.round(this.movieDetails.popularity)
      this.setTrailer();
    }, 150);
    console.log(this.movieDetails);
  }

  setTrailer = () => {
    this.trailerVar = this.movieDetails.videos.results[0].key;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerVar}`);
  }

  rateMovie = () => {
    console.log("Trigger works.");
  }

  isLoaded = () => {
    if (this.movieDetails !== undefined) {
      return true
    } else {
      return false
    };
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

}
