import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieData, PeopleInterface, SelectedMovieData } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  apiData;
  apiDataTR;
  apiDataNP;
  apiMovieData;
  apiSelectedMovieData;
  apiMovieReviews;
  apiPeopleData;
  apiKey = "api_key=09a06bef76827ed3d24bd5d7fa86e5cc";
  apiQuery = "https://api.themoviedb.org/3/search/movie?";
  apiPosterPath = "https://image.tmdb.org/t/p/original/";
  apiRequestPath = "https://api.themoviedb.org/3/movie/";
  apiPeopleRequest = "https://api.themoviedb.org/3/person/";

  headers = new HttpHeaders()
  .set('content-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getApiData = () => (
    this.apiData = this.http.get(this.apiRequestPath + 'popular?' + this.apiKey, { 'headers': this.headers })
  );

  getTRApiData = () => (
    this.apiDataTR = this.http.get(this.apiRequestPath + 'top_rated?' + this.apiKey, { 'headers': this.headers })
  );

  getNPApiData = () => (
    this.apiData = this.http.get(this.apiRequestPath + 'now_playing?' + this.apiKey, { 'headers': this.headers })
  );

  getMovieData = (query): any => (
    this.apiMovieData = this.http.get<MovieData>(this.apiQuery + this.apiKey + '&query=' + query, { 'headers': this.headers })
  );

  getSelectedMovieData = (movieId): Observable<SelectedMovieData> => (
    this.apiSelectedMovieData = this.http.get<SelectedMovieData>(this.apiRequestPath + movieId + '?' + this.apiKey + '&append_to_response=videos,credits,images,similar,reviews,account_states' + '&language=en-US', { 'headers': this.headers })
  );

  getPeopleData = (personId): Observable<PeopleInterface> => (
    this.apiPeopleData = this.http.get<PeopleInterface>(this.apiPeopleRequest + personId + '?' + this.apiKey + '&append_to_response=images,movie_credits' + '&language=en-US', { 'headers': this.headers })
  );
}
