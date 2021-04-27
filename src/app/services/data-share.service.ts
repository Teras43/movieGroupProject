import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  peopleImages;
  peoplePhotoName;
  movieId: any;
  personId: any;
  jpgNotFound = "../../../assets/images/error-512.png";

  constructor() { }

  setImages = (imgObj) => {
    this.peopleImages = imgObj;
  }
}
