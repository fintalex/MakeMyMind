import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // here we must implement it with Services
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // // not logged in so redirect to login page with the return url
        this.router.navigate(['/test'], { queryParams: { returnUrl: state.url }});
        return false;
    
    }
}
