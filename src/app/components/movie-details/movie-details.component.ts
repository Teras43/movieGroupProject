import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {WatchListService} from '../../services/watch-list.service';
import {WatchListMovie} from '../../interfaces';
// import {Validator} from '@angular/forms';
// import { AngularFirestore } from "@angular/fire/firestore";
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators'



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: any;
  movieDetails: { popularity: number; title: any; vote_average: any; poster_path: any; videos: { results: { key: any; }[]; }; };
  trailerVar: any;
  moviePopRound: number;
  title: any;
  safeSrc: SafeResourceUrl;
  screenWidth = window.innerWidth;
  watchListMovie: WatchListMovie[] = [];
  buttonDisabled: boolean = false;
  watchListMovie$;
  docId;
  
  
  
 
 
  

  constructor(
    public apiData: ApiDataService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchListService: WatchListService,
    private userData: WatchListService
    
    

  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.movieId = res.id;
      this.apiData.getSelectedMovieData(this.movieId);
      
    });
    this.watchListService.getWatchListMovies();
    ;
    this.submitted();
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
      this.watchListMovie.push({
        title: this.movieDetails.title,
        vote_average: this.movieDetails.vote_average,
        poster_path: this.movieDetails.poster_path,
      })
 
    }, 100);

  }

  setTrailer = () => {
    this.trailerVar = this.movieDetails.videos.results[0].key;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerVar}`);
  }

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


  submitted= () => {
      // if(this.movieDetails.title === this.userData.userData[].title){
        
      //   console.log('itworkded')
      //   this.buttonDisabled = true;
      
      // }
    }
  

  
  addToWatchList = () => {
    this.watchListMovie.forEach((data: any) =>{
      this.watchListService.addToWatch(data)
    })
    

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

}
