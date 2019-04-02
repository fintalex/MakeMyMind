import { Action } from '@ngrx/store';
import * as CategoryActions from '../actions/categories';

import { Category } from '../../models/category.model';

export interface State {
    ids: string[];
    categories: Category[];
    selected: number;
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    ids: [], 
    categories: [],
    selected: null,
    loaded: false,
    loading: false,
}

export function reducer(
        state: State = initialState, 
        action: CategoryActions.Action): State
{
    switch (action.type){

        case CategoryActions.CategoryActionTypes.categoryLoad: {
            /// maybe we need here to load our Categories from our common service
            /// but all of these must pure function
            return {
                ...state,
                loading: true
            };
        }

        case CategoryActions.CategoryActionTypes.categoryLoadSuccess: {
            const categories = action.payload;

            return {
                categories: categories,
                selected: null,
                loaded: true,
                loading: false,
                ids: categories.map(cat => cat._id)
            };
        }

        case CategoryActions.CategoryActionTypes.categorySelect: {
            const id = action.payload;
            return {
                ...state,
                selected: id
            };
        }

      
        
        default: 
            return state;        
    }
}

export const getIds = (state: State) => state.ids;
export const getCategories = (state: State) => {
    //debugger;
    return state.categories;
}
export const getSelected = (state: State) => state.selected;

