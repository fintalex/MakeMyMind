import * as fromReducers from './reducers';

import {
    ActionReducerMap, MetaReducer
} from '@ngrx/store';

import { CategoryEffects } from '../store/effects/category.effects';
import { BrickTypeEffects } from '../store/effects/brickType.effects';

export interface State {
    category: fromReducers.category.State;
    brickType: fromReducers.brickType.State;
}
  
export const reducers: ActionReducerMap<State> = {
    category: fromReducers.category.reducer,
    brickType: fromReducers.brickType.reducer,
    // router: routerReducer
};
  
export const effects = [CategoryEffects, BrickTypeEffects];

// export const metaReducers: MetaReducer<State>[] = !environment.production 
//   ? [storeFreeze]
//   : [];