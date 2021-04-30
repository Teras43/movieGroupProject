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
  newUpdateBirth;
  newUpdateDeath;
  hasBirthAndDeath: boolean;
  noBioFound = "No bio found!";
  noOtherNames = "No other names found!";
  noBirthdayFound = "No birthday found!";
  noDeathdayFound = "Present";

  // Subscription Variables
  private actQueryParams: Subscription;

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.actQueryParams = this.activatedRoute.queryParams.subscribe(res => {
      this.dataShare.personId = res.id;
      this.apiData.getPeopleData(res.id).subscribe(
        (res) => {
          if (res.success) {
            this.router.navigate(['./error404'])
          };
        },
        (error) => {
          this.router.navigate(['./error404'])
        }
      )
      this.setData();
    });
  }
  
  ngOnInit(): void {
  };
  
  ngOnDestroy(): void {
    this.actQueryParams.unsubscribe();
  }
  
  setData = async () => {
    try {
      await this.apiData.apiPeopleData.subscribe(
        (res) => {
          if (res.success) {
            this.router.navigate(['./error404'])
            return
          };
          this.peopleDetails = res;
          console.log("People details: ", this.peopleDetails);
          // setTimeout(() => {
            this.getUpdateDates(this.peopleDetails.birthday, this.peopleDetails.deathday);
          // }, 300);
        },
        (error) => {
          this.router.navigate(['./error404'])
        }
      );
    } finally {
      return
    }
  };

  getUpdateDates = (birthday, deathday) => {
    if (birthday === null && deathday === null) {
      this.hasBirthAndDeath = false;
    } else if (birthday !== null && deathday !== null) {
      this.hasBirthAndDeath = true;
    }
    if (birthday === null) {
      return
    } else {
      this.newUpdateBirth = new Date(birthday);
    }
    if (deathday === null) {
      return
    } else {
      this.newUpdateDeath = new Date(deathday);
    }
  }

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
