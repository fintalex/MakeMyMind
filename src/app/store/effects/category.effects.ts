import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, startWith } from 'rxjs/operators';

import { CategoryActionTypes, LoadCategoriesSuccess, ErrorCategory, LoadCategories } from '../../store/actions/categories';
import { CategoryService } from '../../userSetting/category/category.service';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {}

    @Effect()
    loadCategories$ = this.actions$.pipe(
        ofType(CategoryActionTypes.categoryLoad),
        startWith(new LoadCategories()),
        switchMap(() => {
            return this.categoryService
                .getCategories()
                .pipe(
                    map(categories => {
                        console.log("***************** I AM IN LOAD CATEGORIES EFFECT ****************")
                        return new LoadCategoriesSuccess(categories);
                    }),
                    catchError(error => of(new ErrorCategory(error)))
                );
            }
        )
    );
}