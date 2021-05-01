import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { WatchListService } from './watch-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  dialogImg;
  dialogTitle;
  peopleImages;
  peoplePhotoName;
  currentUser;
  movieId: any;
  personId: any;
  jpgNotFound = '../../../assets/images/error-512.png';
  public parseUserSub: Subscription;

  constructor(
    private fireAuth: AngularFireAuth,
    private watchListService: WatchListService
  ) { }

  setImages = (imgObj) => {
    this.peopleImages = imgObj;
  };

  parseUserInfo = async () => {
    this.parseUserSub = await this.fireAuth.user.subscribe(data => {
      this.currentUser = data
    });
    setTimeout(() => {
      this.watchListService.docId = this.currentUser.uid;
    }, 200);
  };
}
