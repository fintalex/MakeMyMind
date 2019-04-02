import { Injectable, InjectionToken } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, startWith } from 'rxjs/operators';

import { CategoryActionTypes, LoadCategoriesSuccess, LoadCategoriesFail, LoadCategories } from '../../store/actions/categories';
import { CategoryService } from '../../userSetting/category/category.service';
import { Scheduler } from 'rxjs';

export const DEBOUNCE = new InjectionToken<number>('Test Debounce');
export const SCHEDULER = new InjectionToken<Scheduler>('Test Scheduler');

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {}

    @Effect()
    loadCategories$ = this.actions$.pipe(
        ofType(CategoryActionTypes.categoryLoad),
        //startWith(new LoadCategories()),
        switchMap((action: LoadCategories) => {
            return this.categoryService
                .getCategories()
                .pipe(
                    map(categories => new LoadCategoriesSuccess(categories)),
                    catchError(error => of(new LoadCategoriesFail(error)))
                );
            }
        )
    );
}