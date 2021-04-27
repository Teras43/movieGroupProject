import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { GuardDialogComponent } from '../dialogs/guard-dialog/guard-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsGuard implements CanActivate {

  constructor(
    private router: Router,
    public dataShare: DataShareService,
    private dialog: MatDialog,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = +route.url[1].path;
    console.log(route.url);
    if (id === this.dataShare.personId) return true;
    if (isNaN(Number(id)) || id !== this.dataShare.movieId) {
      console.log("movies");
      this.openDialog();
      this.router.navigate(['/popular']);
      return false;
    };
    return true;
  };

  openDialog = () => {
    const dialogRef = this.dialog.open(GuardDialogComponent);

    dialogRef.afterClosed();
  };
  
}
