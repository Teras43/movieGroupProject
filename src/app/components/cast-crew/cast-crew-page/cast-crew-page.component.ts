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

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.personId = res.id;
      this.apiData.getPeopleData(this.personId);
    });
    setTimeout(() => {
      this.setData();
    }, 300);
  };

  setData = () => {
    this.peopleDetails = this.apiData.apiPeopleData;
    this.isAliveVar = this.peopleDetails.deathday;
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
    if (this.peopleDetails !== undefined) {
      return true
    } else {
      return false
    };
  };

  goToPhotos = () => {
    this.dataShare.setImages(this.peopleDetails.images);
    this.dataShare.peoplePhotoName = this.peopleDetails.name;
    this.router.navigate([`/people/${this.personId}/photos`]);
  }

}
