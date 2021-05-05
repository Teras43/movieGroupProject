import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  providers = AuthProvider;

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
