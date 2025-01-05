import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userIdInStorage = JSON.parse(localStorage.getItem('currentUser')!).id;
    const userIdInRoute = +route.params['id'];
    
    if (userIdInStorage && userIdInRoute && userIdInStorage === userIdInRoute) {
      this.router.navigate(['/profile']);
      return false;
    }

    return true;
  }
}
