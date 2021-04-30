import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  error404Img = '../../../assets/images/pexels-lenin-estrada.jpg';

  constructor(
    private router: Router,
    public dataShare: DataShareService
  ) { }

  ngOnInit(): void {
  }

  goHome = () => {
    this.router.navigate([''])
  }

}
