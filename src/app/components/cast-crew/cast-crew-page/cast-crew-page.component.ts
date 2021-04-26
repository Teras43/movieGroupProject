import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-cast-crew-page',
  templateUrl: './cast-crew-page.component.html',
  styleUrls: ['./cast-crew-page.component.scss']
})
export class CastCrewPageComponent implements OnInit {
  personId;
  peopleDetails;
  isAliveVar;
  noBioFound = "No Bio Found!";
  noOtherNames = "No other names found!";

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.apiData.getPeopleData(res.id);
      this.personId = res.id;
    });
    setTimeout(() => {
      this.setData();
    }, 500);
  };

  setData = () => {
    this.peopleDetails = this.apiData.apiPeopleData;
    setTimeout(() => {
      this.isAliveVar = this.peopleDetails.deathday;
    }, 200);
    console.log(this.peopleDetails);
  };

  getUpdateDate = (updateStr) => {
    let newUpdate = new Date(updateStr);
    return newUpdate;
  }

  isAlive = () => {
    if (this.isAliveVar === null) {
      return "Present"
    } else {
      return this.isAliveVar
    };
  };

  isLoaded = () => {
    if (this.isAliveVar !== undefined) {
      return true
    } else {
      return false
    };
  };

  goToPhotos = () => {
    this.dataShare.setImages(this.peopleDetails.images);
    this.dataShare.peoplePhotoName = this.peopleDetails.name;
    this.router.navigate([`/people/${this.personId}/photos`]);
  };

  selectMovie = (movieId) => {
    this.router.navigate([`/movie`], { queryParams: {
      id: movieId
    } });
  };
}
