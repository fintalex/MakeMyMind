import { Action } from '@ngrx/store';
import { Category } from '../../models/category.model';

// export const SELECT_CATEGORY    = '[Categories] Select';
// export const ADD_CATEGORY       = '[Categories] Add';
// export const LOAD_CATEGORIES    = '[Categories] Load';
// export const REMOVE_CATEGORY    = '[Categories] Remove';
// export const UPDATE_CATEGORY    = '[Categories] Update';

export enum CategoryActionTypes {
    categorySelect        = '[Categories] Select',
    categoryAdd           = '[Categories] Add',
    categoryLoad          = '[Categories] Load',
    categoryLoadSuccess   = '[Categories] Load success', 
    categoryRemove        = '[Categories] Remove',
    categoryUpdate        = '[Categories] Update',
    categoryError         = '[Categories] Error',
}


export class Select implements Action {
    readonly type = CategoryActionTypes.categorySelect;
    constructor(public payload: number) { }
}

export class AddCategory implements Action {
    readonly type = CategoryActionTypes.categoryAdd;
    constructor(public payload: Category) { }
}

export class LoadCategories implements Action {
    readonly type = CategoryActionTypes.categoryLoad;
}
export class LoadCategoriesSuccess implements Action {
    readonly type = CategoryActionTypes.categoryLoadSuccess;
    constructor(public payload: Category[]) {}
  }

export class RemoveCategory implements Action {
    readonly type = CategoryActionTypes.categoryRemove;
    constructor(public id: number) { }
}

export class UpdateCategory implements Action {
    readonly type = CategoryActionTypes.categoryUpdate;
    constructor(public id: number, public category: Category) { }
}

export class ErrorCategory implements Action {
    readonly type = CategoryActionTypes.categoryError;
    constructor(public payload: any) {}
  }

export type Action = 
   | AddCategory 
   | Select 
   | LoadCategories 
   | LoadCategoriesSuccess
   | RemoveCategory 
   | UpdateCategory
   | ErrorCategory;