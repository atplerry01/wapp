import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataService } from '../service/data.service';

@Injectable({ providedIn: 'root', })
export class LoggedInGuardService implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.dataService.loggedIn()) {
      return true; // logged in so return true
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}

