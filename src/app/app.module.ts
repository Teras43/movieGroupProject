import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { DialogComponent } from './components/dialogs/dialog/dialog.component';
import { CastCrewPageComponent } from './components/cast-crew/cast-crew-page/cast-crew-page.component';
import { PhotoViewerComponent } from './components/cast-crew/photo-viewer/photo-viewer.component';
import { GuardDialogComponent } from './components/dialogs/guard-dialog/guard-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    LoginPageComponent,
    MovieDetailsComponent,
    WatchListComponent,
    NavbarComponent,
    DialogComponent,
    CastCrewPageComponent,
    PhotoViewerComponent,
    GuardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    // FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFirestoreModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot( {apiKey: "AIzaSyAMCnxtVN98qKdRcGkn5dnis4iLNqqsB5Q",
    authDomain: "group-project-movie.firebaseapp.com",
    projectId: "group-project-movie",
    storageBucket: "group-project-movie.appspot.com",
    messagingSenderId: "890312810141",
    appId: "1:890312810141:web:25e812f59f9b92f04ebe74",
    measurementId: "G-X3PX1SH59R"},
    () => 'movieGroupProject',
    {
      enableFirestoreSync: true, // enable/disable autosync users with firestore
      toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
      toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
      authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
      authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
      passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
      passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
      // Same as password but for the name
      nameMaxLength: 50,
      nameMinLength: 2,
      // If set, sign-in/up form is not available until email has been verified.
      // Plus protected routes are still protected even though user is connected.
      guardProtectedRoutesUntilEmailIsVerified: false,
      enableEmailVerification: false, // default: true
      useRawUserCredential: true, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, GuardDialogComponent]
})
export class AppModule { }
