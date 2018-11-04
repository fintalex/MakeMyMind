import { Action } from '@ngrx/store';
import * as CategoryActions from '../actions/categories';

import { Category } from '../../models/category.model';

export interface State {
    ids: string[];
    categories: { [id: number]: Category };
    selected: number;
}

export const initialState: State = {
    ids: ['1','2','3'], 
    categories: {
        1: {
            _id: '1', name: 'Семья', color: '#ebbe2a', description: 'Семья', updated: new Date()
        },
        2: { 
            _id: '2', name: 'Здоровье', color: '#1cdafc', description: 'Здоровье', updated: new Date()
        },
        3: { 
            _id: '3', name: 'Саморазвитие', color: '#ff0000', description: 'Саморазвитие', updated: new Date()
        },
        4: { 
            _id: '4', name: 'Спорт', color: '#8257f8', description: 'Спорт', updated: new Date()
        }
    },
    selected: null
}

export function reducer(state: State = initialState, action: CategoryActions.Action){
    switch (action.type){
        case CategoryActions.ADD_CATEGORY: {
            const newCat: Category = action.payload;
            return {
                ...state,
                ids: [...state.ids, newCat._id],
                categories: { ...state.categories, newCat}
            }
        }

        case CategoryActions.SELECT_CATEGORY: {
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
export const getCategories = (state: State) => state.categories;
export const getSelected = (state: State) => state.selected;

