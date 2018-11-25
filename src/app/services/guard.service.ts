import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable ,  of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromReducers from './../store/reducers';
import * as fromSelectors from './../store/selectors/category.selectors';
import { LoadCategories } from './../store/actions/categories';

@Injectable()
export class GuardService implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromReducers.category.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // here we must implement it with Services
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
            // return this.checkStore().pipe(
            //     switchMap(() => of(true)),
            //     catchError(() => of(false))
            // );
        }

        

        // // not logged in so redirect to login page with the return url
        this.router.navigate(['/test'], { queryParams: { returnUrl: state.url }});
        return false;    
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromSelectors.getCategoriesLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    debugger;
                    this.store.dispatch(new LoadCategories());
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
