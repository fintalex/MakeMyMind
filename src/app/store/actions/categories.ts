import { Action } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const SELECT_CATEGORY    = '[Categories] Select';
export const ADD_CATEGORY       = '[Categories] Add';
//export const REMOVE_CATEGORY    = '[Categories] Remove';
//export const UPDATE_CATEGORY    = '[Categories] Remove';


export class Select implements Action {
    readonly type = SELECT_CATEGORY;
    constructor(public payload: number) { }
}

export class AddCategory implements Action {
    readonly type = ADD_CATEGORY;
    constructor(public payload: Category) { }
}

// export class RemoveCategory implements Action {
//     readonly type = REMOVE_CATEGORY;
//     constructor(public payload: Category) { }
// }

// export class UpdateCategory implements Action {
//     readonly type = REMOVE_CATEGORY;
//     constructor(public payload: Category) { }
// }

export type Action = AddCategory | Select;