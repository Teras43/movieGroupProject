import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack = () => {
    this.location.back();
  };

  navHome = () => {
    this.router.navigate(['./popular']).then(() => {
      window.location.reload();
    });
  };

  navList = () => {
    this.router.navigate(['./watchlist'])
  };

  logOut = () => {
    console.log("Logout route goes here.")
  }

}
