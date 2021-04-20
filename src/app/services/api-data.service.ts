import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  apiData;
  apiKey = "api_key=09a06bef76827ed3d24bd5d7fa86e5cc";
  apiMovieId;
  apiQuery = "https://api.themoviedb.org/3/movie/"
  apiPopular = "https://api.themoviedb.org/3/movie/popular?";
  apiPosterPath = "https://image.tmdb.org/t/p/original/";

  headers = new HttpHeaders()
  .set('content-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getApiData = () => (
    this.apiData = this.http.get(this.apiPopular + this.apiKey, { 'headers': this.headers, 'withCredentials': false })
  )


}
