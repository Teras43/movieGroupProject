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
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { DialogComponent } from './components/dialog/dialog.component';
import { CastCrewPageComponent } from './components/cast-crew/cast-crew-page/cast-crew-page.component';
import { PhotoViewerComponent } from './components/cast-crew/photo-viewer/photo-viewer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


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
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
      enableFirestoreSync: true,
      toastMessageOnAuthSuccess: false, 
      toastMessageOnAuthError: false, 
      authGuardFallbackURL: '/loggedout',
      authGuardLoggedInURL: '/loggedin', 
      passwordMaxLength: 60,
      passwordMinLength: 8,
      nameMaxLength: 50,
      nameMinLength: 2,
      guardProtectedRoutesUntilEmailIsVerified: false,
      enableEmailVerification: false,
      useRawUserCredential: true,
    }),
    
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
