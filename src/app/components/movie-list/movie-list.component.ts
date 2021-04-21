import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  popularData;
  movieData;
  searchResponse;
  selectedGenre: string;
  searchQuery: string;
  searchRegex = /\w+/ig;

  constructor(
    private apiData: ApiDataService,
  ) { }

  ngOnInit(): void {
    this.apiData.getApiData().subscribe(res => {
      this.popularData = res;
      console.log(this.popularData);
    });

    // this.apiData.test();
  };

  searchFn = () => {
    console.log(this.searchQuery);
    if (this.searchQuery === '' || this.searchQuery === null || this.searchQuery === undefined) return;
    if (this.searchQuery.match(this.searchRegex)) {
      this.apiData.getMovieData(this.searchQuery).subscribe(res => {
        this.searchResponse = res
        console.log(this.searchResponse);
      });
    } else {
      return;
    }
  }
}
