import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable ,  of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromReducers from './../store/reducers';
import * as fromCategorySelectors from './../store/selectors/category.selectors';
import * as fromBrickTypeSelectors from './../store/selectors/brickType.selectors';
import { LoadCategories } from './../store/actions/categories';
import { LoadBrickTypes } from '../store/actions/brickTypes';

@Injectable()
export class GuardService implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromReducers.category.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // here we must implement it with Services
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.checkStore();
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

    checkStore() {
        this.store.select(fromCategorySelectors.getCategoriesLoaded)
            .subscribe((loaded)=> {
                if (!loaded) {
                    this.store.dispatch(new LoadCategories());
                }
            });

        this.store.select(fromBrickTypeSelectors.getBrickTypesLoaded)
            .subscribe((loaded)=> {
                if (!loaded) {
                    this.store.dispatch(new LoadBrickTypes());
                }
            });
    }
}
