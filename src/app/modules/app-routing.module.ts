import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { WatchListComponent } from '../components/watch-list/watch-list.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'popular', component: MovieListComponent },
  { path: 'movie', component: MovieDetailsComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
