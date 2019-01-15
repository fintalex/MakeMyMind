import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';

import * as fromCategories from '../reducers/category.reducer';

//import * as fromReducers from './reducers';

import * as _ from 'underscore';

export interface State {
    categories: fromCategories.State;
}
export const reducers: ActionReducerMap<State> = {
    categories: fromCategories.reducer,
};

// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//     return function (state: State, action: any): State {
//         console.log('state', state);
//         console.log('action', action);
//         return reducer(state, action);
//     };
// }
// export const metaReducers: MetaReducer<State>[] = [logger];


// IMPORTANT NOTE: 
// here we need to create the same featureSelectors for example for notifacation
// export const getNotificationStore = createFeatureSelector<fromNotifications.State>('notification');
// where notification is from index.ts State Interface.
export const getCategoryStore = createFeatureSelector<fromCategories.State>('category');

// export const getCategoryState = (state: State) => {
//     console.log("*** I'L DO IT ******" );
//     debugger;
//     return state.categories;
// }

// export const getIds = createSelector(
//     getCategoryStore,
//     fromCategories.getIds,
// );

// export const getCategoryEntities = createSelector(
//     getCategoryStore,
//     fromReducers.hero.heroEntitySelectors.selectAll
//   );

export const getCategories = createSelector(
    getCategoryStore,
    fromCategories.getCategories
);

export const getSelected = createSelector(
    getCategoryStore,
    fromCategories.getSelected
);

export const getSelectedCategory = createSelector(
    getSelected,
    getCategories,
    (selectedId, categories) => {
        debugger;
        // var selectedCategory = {
        //     ...categories[selectedId]
        // };
        var selectedCategory = _.find(categories, (cat:any) => cat._id == selectedId);
        
        return  selectedCategory;
    }
);

// export const getAllCategories = createSelector(
//     getIds,
//     getCategories,
//     (ids, categories) => {
//         return ids.map(id=>categories[id]);
//     }
// );

export const getAllCategories = createSelector(
    getCategoryStore,
    (categoryStore: fromCategories.State) => {
        //debugger;
        console.log("************ I AM IN SELECTOR getAllCategories ********************")
        return Object.values(categoryStore.categories);
    }
);

export const getCategoriesLoaded = createSelector(
    getCategoryStore,
    (categoryStore: fromCategories.State) => {
        debugger;
        return categoryStore.loaded;
    }
);