import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'popular', component: MovieListComponent },
  { path: 'movie', component: MovieDetailsComponent },
  { path: '', redirectTo: 'popular', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
