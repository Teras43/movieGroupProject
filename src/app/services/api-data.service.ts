import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  apiData;
  apiMovieData;
  apiSelectedMovieData;
  apiKey = "api_key=09a06bef76827ed3d24bd5d7fa86e5cc";
  apiQuery = "https://api.themoviedb.org/3/search/movie?"
  apiPopular = "https://api.themoviedb.org/3/movie/popular?";
  apiPosterPath = "https://image.tmdb.org/t/p/original/";
  apiRequestPath = "https://api.themoviedb.org/3/movie/";

  headers = new HttpHeaders()
  .set('content-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getApiData = () => (
    this.apiData = this.http.get(this.apiPopular + this.apiKey, { 'headers': this.headers })
  );

  getMovieData = (query): any => (
    this.apiMovieData = this.http.get<MovieData>(this.apiQuery + this.apiKey + '&query=' + query, { 'headers': this.headers })
  );

  getSelectedMovieData = (movieId) => {
    this.apiSelectedMovieData = this.http.get(this.apiRequestPath + movieId + '?' + this.apiKey, { 'headers': this.headers })
  };

  // test = () => {
  //   this.http.get('https://api.themoviedb.org/3/movie/157336?' + this.apiKey).subscribe(res => {
  //     console.log(res);
  //   })
  // }


}
