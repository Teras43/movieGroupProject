import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  apiData;

  apiKey = "https://api.themoviedb.org/3/movie/550?api_key=09a06bef76827ed3d24bd5d7fa86e5cc";

  headers = new HttpHeaders()
  .set('content-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getApiData = () => (
    this.http.get(this.apiKey, { 'headers': this.headers, 'withCredentials': false })
  )


}
