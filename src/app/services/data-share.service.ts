import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  peopleImages;
  peoplePhotoName;

  constructor() { }

  setImages = (imgObj) => {
    this.peopleImages = imgObj;
  }
}
