import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';

import * as fromCategories from './categories';
import * as fromFilms from './films';


export interface State {
    categories: fromCategories.State;
    films: fromFilms.State;
}
export const reducers: ActionReducerMap<State> = {
    categories: fromCategories.reducer,
    films: fromFilms.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<State>[] = [logger];

export const getCategoryState = createFeatureSelector<fromCategories.State>('categories');

export const getIds = createSelector(
    getCategoryState,
    fromCategories.getIds,
);

export const getCategories = createSelector(
    getCategoryState,
    fromCategories.getCategories
);

export const getSelected = createSelector(
    getCategoryState,
    fromCategories.getSelected
);

export const getSelectedCategory = createSelector(
    getSelected,
    getCategories,
    (selectedId, categories) => {
        return {
            ...categories[selectedId]
        };
    }
);

export const getAllCategories = createSelector(
    getIds,
    getCategories,
    (ids, categories) => {
        return ids.map(id=>categories[id]);
    }
);