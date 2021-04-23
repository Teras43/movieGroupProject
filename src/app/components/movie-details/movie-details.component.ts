import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {WatchListService} from '../../services/watch-list.service';
<<<<<<< HEAD
import {WatchListMovie} from '../../interfaces';
// import {Validator} from '@angular/forms';
// import { AngularFirestore } from "@angular/fire/firestore";
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators'


=======
import {WatchListMovie} from '../../interfaces'
import { DialogComponent } from '../dialog/dialog.component';
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
<<<<<<< HEAD
  movieId: any;
  movieDetails: { popularity: number; title: any; vote_average: any; poster_path: any; videos: { results: { key: any; }[]; }; };
  trailerVar: any;
  moviePopRound: number;
  title: any;
=======
  movieId;
  movieDetails;
  trailerVar;
  moviePopRound;
  updateDate = [];
  isAddedVar;
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767
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
<<<<<<< HEAD
    private userData: WatchListService
    
    

=======
    private dialog: MatDialog
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767
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
<<<<<<< HEAD
      this.watchListMovie.push({
        title: this.movieDetails.title,
        vote_average: this.movieDetails.vote_average,
        poster_path: this.movieDetails.poster_path,
      })
 
=======
      console.log(this.movieDetails)
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767
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

<<<<<<< HEAD
  rateMovie = () => {
    console.log(this.userData)
    
  }
=======
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
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767

  isLoaded = () => {
    if (this.moviePopRound !== undefined) {
      return true
    } else {
      return false
    };
  };

<<<<<<< HEAD

  submitted= () => {
      // if(this.movieDetails.title === this.userData.userData[].title){
        
      //   console.log('itworkded')
      //   this.buttonDisabled = true;
      
      // }
    }
  

  
  addToWatchList = () => {
  
    // console.log(this.watchListMovie, "wack")
    // this.watchListMovie.forEach((data: any) =>{
    //   this.watchListService.addToWatch(data)
    // })
    

  }
=======
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
>>>>>>> ae9e1ec4011c984b691ea0dd18527ce2872df767


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

}
