import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app-services/auth.service';
import { Route } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    return true;
  }
  
}
