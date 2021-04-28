import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  popData;
  topData;
  playData;
  movieData;
  searchResponse;
  selectedGenre: string;
  searchQuery: string;
  searchRegex = /\w+/ig;

  constructor(
    private apiData: ApiDataService,
    public dataShare: DataShareService,
    private router: Router,
  ) {
    this.apiData.getApiData().subscribe(res => {
      this.popData = res;
    })
    this.apiData.getTRApiData().subscribe(res => {
      this.topData = res;
    });
    this.apiData.getNPApiData().subscribe(res => {
      this.playData = res;
    });
   }

  ngOnInit(): void {
    
  };

  searchFn = () => {
    if (this.searchQuery === '' || this.searchQuery === null || this.searchQuery === undefined) return;
    if (this.searchQuery.match(this.searchRegex)) {
      this.apiData.getMovieData(this.searchQuery).subscribe(res => {
        this.searchResponse = res
        console.log(this.searchResponse);
      });
    } else {
      return;
    };
  };

  selectMovie = (movieId) => {
    this.dataShare.movieId = movieId;
    this.router.navigate([`/movie/${movieId}`], { queryParams: {
      id: movieId
    } });
  }

  isLoaded = () => {
    if (this.popData !== undefined && this.topData !== undefined && this.playData !== undefined || this.searchResponse !== undefined) {
      return true
    } else {
      return false
    };
  };
}
