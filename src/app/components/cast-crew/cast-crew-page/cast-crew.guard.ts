import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { GuardDialogComponent } from '../../dialogs/guard-dialog/guard-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CastCrewGuard implements CanActivate {

  constructor(
    private router: Router,
    public dataShare: DataShareService,
    private dialog: MatDialog,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id = +route.url[1].path;
    if (id === this.dataShare.movieId) return true;
    if (isNaN(Number(id)) || id !== this.dataShare.personId) {
      console.log("person");
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
