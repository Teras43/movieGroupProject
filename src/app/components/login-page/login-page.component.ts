import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth, 
    public router: RouterModule,
    private route: Router
    ) { }


  ngOnInit(): void {
  }

  appNav = () => {
    this.route.navigate(['./popular']);
  };
}
