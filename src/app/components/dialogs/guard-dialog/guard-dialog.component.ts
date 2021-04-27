import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-guard-dialog',
  templateUrl: './guard-dialog.component.html',
  styleUrls: ['./guard-dialog.component.scss']
})
export class GuardDialogComponent implements OnInit {
  form: FormGroup;
  title: string;

  constructor(
    public apiData: ApiDataService,
    private dialogRef: MatDialogRef<GuardDialogComponent>,
  ) { }

  ngOnInit(): void {
  };

  close = () => {
    this.dialogRef.close();
  };
}
