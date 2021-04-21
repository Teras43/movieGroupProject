import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId;
  movieDetails;

  constructor(
    public apiData: ApiDataService,
    private activatedRoute: ActivatedRoute
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
  
  setData = () => {
    this.movieDetails = this.apiData.apiSelectedMovieData;
    console.log(this.movieDetails);
  }

}
