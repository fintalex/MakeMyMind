import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';

import * as fromBrickTypes from '../reducers/brickType.reducer';

import * as _ from 'underscore';

export interface State {
    brickTypes: fromBrickTypes.State;
}
export const reducers: ActionReducerMap<State> = {
    brickTypes: fromBrickTypes.reducer,
};


// IMPORTANT NOTE: 
// here we need to create the same featureSelectors for example for notifacation
// export const getNotificationStore = createFeatureSelector<fromNotifications.State>('notification');
// where notification is from index.ts State Interface.
export const getBrickTypeStore = createFeatureSelector<fromBrickTypes.State>('brickType');

export const getBrickTypes = createSelector(
    getBrickTypeStore,
    fromBrickTypes.getBrickTypes
);

export const getSelected = createSelector(
    getBrickTypeStore,
    fromBrickTypes.getSelected
);

export const getLoading = createSelector(
    getBrickTypeStore,
    fromBrickTypes.getBrickTypeLoading
);

export const getLoaded = createSelector(
    getBrickTypeStore,
    fromBrickTypes.getBrickTypeLoaded
);

export const getSelectedBrickType = createSelector(
    getSelected,
    getBrickTypes,
    (selectedId, brickTypes) => {
        //debugger;
        var selectedBrickType = _.find(brickTypes, (cat:any) => cat._id == selectedId);
        
        return  selectedBrickType;
    }
);

// export const getAllBrickTypes = createSelector(
//     getBrickTypeStore,
//     (brickTypeStore: fromBrickTypes.State) => {
//         return Object.values(brickTypeStore.brickTypes);
//     }
// );

export const getBrickTypesLoaded = createSelector(
    getBrickTypeStore,
    (brickTypeStore: fromBrickTypes.State) => brickTypeStore.loaded
);