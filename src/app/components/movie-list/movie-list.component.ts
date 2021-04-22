import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiData.getApiData().subscribe(res => {
      this.popData = res;
    });
    this.apiData.getTRApiData().subscribe(res => {
      this.topData = res;
    });
    this.apiData.getNPApiData().subscribe(res => {
      this.playData = res;
    });

    // this.apiData.test();
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
    this.router.navigate([`./movie`], { queryParams: {
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
