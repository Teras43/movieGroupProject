import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {
  currentName;
  images;

  constructor(
    public apiData: ApiDataService,
    public dataShare: DataShareService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.currentName = this.dataShare.peoplePhotoName;
    this.images = this.dataShare.peopleImages;
  };

  isLoaded = () => {
    if (this.images !== undefined && this.currentName !== undefined) {
      return true;
    } else {
      return false;
    };
  };

  goBack = () => {
    this.location.back();
  };

}
