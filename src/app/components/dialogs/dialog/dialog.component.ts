import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiDataService } from 'src/app/services/api-data.service';
import { WatchListService } from '../../../services/watch-list.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  title: string;

  constructor(
    public apiData: ApiDataService,
    private watchList: WatchListService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)   
    data
  ) { 
    this.title = data.title;
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.title, []],
    });
  };

  rate = () => {
    this.dialogRef.close(this.form.value);
    console.log(this.watchList.rating);
  };

  close = () => {
    this.dialogRef.close();
  }

  getSliderValue = (event) => {
    this.watchList.rating = event.value;
  }

}
