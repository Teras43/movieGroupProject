import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiDataService } from 'src/app/services/api-data.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-cast-crew-page',
  templateUrl: './cast-crew-page.component.html',
  styleUrls: ['./cast-crew-page.component.scss']
})
export class CastCrewPageComponent implements OnInit, OnDestroy {
  peopleDetails;
  isAliveVar;
  newUpdate;
  noBioFound = "No bio found!";
  noOtherNames = "No other names found!";
  noBirthdayFound = "No birthday found!";

  // Subscription Variables
  private actQueryParams: Subscription;

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.actQueryParams = this.activatedRoute.queryParams.subscribe(res => {
      this.apiData.getPeopleData(res.id);
      this.dataShare.personId = res.id;
      this.setData();
    });
  };

  ngOnDestroy(): void {
    this.actQueryParams.unsubscribe();
  }

  setData = () => {
    try {
      this.apiData.apiPeopleData.subscribe(res => {
        this.peopleDetails = res;
      })
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
    if (this.peopleDetails !== undefined) {
      return true
    } else {
      return false
    };
  };

  goToPhotos = () => {
    this.dataShare.setImages(this.peopleDetails.images);
    this.dataShare.peoplePhotoName = this.peopleDetails.name;
    this.router.navigate([`/people/${this.dataShare.personId}/photos`]);
  };

  selectMovie = async (movieId) => {
    this.dataShare.movieId = await movieId;
    this.router.navigate([`/movie/${movieId}`], { queryParams: {
      id: movieId
    } });
  };
}
