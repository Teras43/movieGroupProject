import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastCrewPageComponent } from '../components/cast-crew/cast-crew-page/cast-crew-page.component';
import { PhotoViewerComponent } from '../components/cast-crew/photo-viewer/photo-viewer.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { WatchListComponent } from '../components/watch-list/watch-list.component';
import { MovieDetailsGuard } from '../components/movie-details/movie-details-guard.guard';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'popular', component: MovieListComponent, canActivate: [ LoggedInGuard ] }, 
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [ LoggedInGuard, MovieDetailsGuard ] },
  { path: 'people/:id', component: CastCrewPageComponent, canActivate: [ LoggedInGuard, MovieDetailsGuard ] },
  { path: 'people/:id/photos', component: PhotoViewerComponent, canActivate: [ LoggedInGuard ] },
  { path: 'watchlist', component: WatchListComponent, canActivate: [ LoggedInGuard ] },
  { path: 'loggedout', component: LoginPageComponent },
  { path: '', redirectTo: 'popular', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
