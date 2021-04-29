import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiDataService } from 'src/app/services/api-data.service';
import { WatchListService } from '../../../services/watch-list.service';
import { RatingInterface } from '../../../interfaces';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  poster_path: string;
  title: string;
  rated: boolean;
  curRating: number;
  movieData = [];

  ratingNumbers: RatingInterface[] = [
    { value: 10, tag: "(Masterpiece)"},
    { value: 9, tag: "(Amazing)"},
    { value: 8, tag: "(Great)"},
    { value: 7, tag: "(Good)"},
    { value: 6, tag: "(Fine)"},
    { value: 5, tag: "(Average)"},
    { value: 4, tag: "(Bad)"},
    { value: 3, tag: "(Very Bad)"},
    { value: 2, tag: "(Horrible)"},
    { value: 1, tag: "(Appalling)"},
  ];

  constructor(
    public apiData: ApiDataService,
    private watchListService: WatchListService,
    public dataShare: DataShareService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)   
    data
    ) {
    this.poster_path = this.dataShare.dialogImg;
    this.title = this.dataShare.dialogTitle;
    this.curRating = data.curRating;
  };
  
  ngOnInit(): void {
    this.setRating(this.curRating);
  };

  setRating = (ratingData) => {
    if (ratingData >= 1 && ratingData <= 10) {
      this.curRating = ratingData
      this.rated = true;
    } else {
      this.curRating = 5;
      this.rated = false;
    }
  }

  rate = () => {
    this.movieData.push({
      poster_path: this.poster_path,
      title: this.title,
      userRating: this.curRating
    });
    this.dialogRef.close();
    this.watchListService.updateRatedList(this.movieData)
    this.movieData = [];
  };

  removeClose = async () => {
    try {
      await this.watchListService.getUserVar.forEach(user => {
        if (user.id === this.dataShare.currentUser.uid) {
          user.data.rated.forEach(movie => {
            if (movie.title === this.title) {
              this.watchListService.deleteRatedMovie({movie});
            } else {
              return
            };
          });
        }
      });
    } finally {
      this.watchListService.checkTitle(this.title, this.dataShare.currentUser.uid);
    }
    this.dialogRef.close();
  }

  close = () => {
    this.dialogRef.close();
  };

  isLoaded = () => {
    if (this.rated !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
