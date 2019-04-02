import { TestBed, inject } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SpyLocation } from '@angular/common/testing';
// import { Location } from '@angular/common';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { async } from 'rxjs/scheduler/async';

import { CategoryEffects, SCHEDULER, DEBOUNCE } from './category.effects';
import { CategoryService } from '../../userSetting/category/category.service';
import { Category } from './../../models/category.model';
import { LoadCategoriesSuccess, LoadCategoriesFail, LoadCategories } from '../../store/actions/categories';

// ?????
export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

// ?????
export function getActions() {
    return new TestActions();
}

// ?????
class MockCategoryService {
    getCategories = jasmine.createSpy('getCategories');
    createCategory = jasmine.createSpy('createCategory');
    updateCategory = jasmine.createSpy('updateCategory');
    deleteCategory = jasmine.createSpy('deleteCategory');
}

describe('CategoryEffects', ()=> {
    let actions$: TestActions;
    let effects: CategoryEffects;
    let categoryService: MockCategoryService;
    // let location: SpyLocation;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CategoryEffects,
                provideMockActions(()=>actions$), // ???
                { provide: CategoryService, useClass: MockCategoryService},
                { provide: Actions, useFactory: getActions },
                { provide: DEBOUNCE, useValue: 30 },
                { provide: SCHEDULER, useFactory: getTestScheduler }
            ]
        });

        effects = TestBed.get(CategoryEffects);
        categoryService = TestBed.get(CategoryService);
        actions$ = TestBed.get(Actions);
        //location = TestBed.get(Location);
    });

    describe('loadCategories$', ()=>{
        it('should return a LoadCategorySuccess, with categories', ()=>{
            // payload data
            const categories = [
                {_id: '1', color: '#111', name: 'Category1'} as Category,
                {_id: '2', color: '#222', name: 'Category2'} as Category
            ];

            // start action and completion action
            const loadCategoriesAction = new LoadCategories();
            const completion = new LoadCategoriesSuccess(categories);

            // setup the Effect
            actions$.stream = hot('-a', {a: loadCategoriesAction});
            const response = cold('-b|', {b: categories});
            const expected = cold('--c', {c: completion});
            categoryService.getCategories.and.returnValue(response);

            expect(effects.loadCategories$).toBeObservable(expected);
        });

        it('should return a LoadCategoryFail if there is a failure', ()=>{
            const error = 'Load Fail';
            const loadCategoriesAction = new LoadCategories();
            const completion = new LoadCategoriesFail(error);

            // setup the Effect
            actions$.stream = hot('-a', {a: loadCategoriesAction});
            const response = cold('-#|', {}, error);
            const expected = cold('--c', {c: completion});
            categoryService.getCategories.and.returnValue(response);

            expect(effects.loadCategories$).toBeObservable(expected);
        });
    });
});