import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanLoad, CanActivate {
  
  constructor( private authService: AuthService, private router: Router ){}

  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/auth/login'])}
          }),
          take(1)
        );
  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/auth/login'])}
          })
        );
  }
}
