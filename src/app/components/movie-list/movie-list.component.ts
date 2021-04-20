import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  constructor(
    private apiData: ApiDataService
  ) { }

  ngOnInit(): void {
    this.apiData.getApiData().subscribe(res => {
      console.log(res);
    })
  }

}
