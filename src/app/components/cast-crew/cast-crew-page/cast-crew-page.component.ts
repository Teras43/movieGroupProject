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
  newUpdate;
  noBioFound = "No bio found!";
  noOtherNames = "No other names found!";
  noBirthdayFound = "No birthday found!";

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

  setData =  async () => {
    try {
      this.peopleDetails = this.apiData.apiPeopleData;
      console.log(this.peopleDetails);
    } finally {
      setTimeout(() => {
        this.getUpdateDate(this.peopleDetails.birthday);
        this.isAliveVar = this.peopleDetails.deathday;
      }, 200);
    }
  };

  getUpdateDate = (updateStr) => {
    if (updateStr === null) {
      this.newUpdate = this.noBirthdayFound;
      return this.newUpdate
    } else {
      this.newUpdate = new Date(updateStr)
      return this.newUpdate;
    }
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
