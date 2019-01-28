import { Action } from '@ngrx/store';
import * as BrickTypeActions from '../actions/brickTypes';

import { BrickType } from '../../models/brick-type.model';
import { brickType } from '.';

export interface State {
    ids: string[];
    brickTypes: BrickType[];
    selected: number;
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    ids: [], 
    brickTypes: [],
    selected: null,
    loaded: false,
    loading: false,
}

export function reducer(
        state: State = initialState, 
        action: BrickTypeActions.Action): State
{
    switch (action.type){
        // Load Start for All Brick Types (for User)
        case BrickTypeActions.BrickTypeActionTypes.brickTypeLoadAfterReload:
        case BrickTypeActions.BrickTypeActionTypes.brickTypeLoad: {
            /// maybe we need here to load our brickTypes from our common service
            /// but all of these must pure function
            return {
                ...state,
                loading: true
            };
        }

        // Load Success All Brick Types (for User)
        case BrickTypeActions.BrickTypeActionTypes.brickTypeLoadSuccess: {
            const brickTypes = action.payload;

            return {
                brickTypes: brickTypes,
                selected: null,
                loaded: true,
                loading: false,
                ids: brickTypes.map(cat => cat._id)
            };
        }

        // Select Brick Type
        case BrickTypeActions.BrickTypeActionTypes.brickTypeSelect: {
            const id = action.payload;
            return {
                ...state,
                selected: id
            };
        }

        // Remove Brick Type Success
        case BrickTypeActions.BrickTypeActionTypes.brickTypeRemoveSuccess: {
            const deletedId = action.id;
            
            var allBrickTypes: BrickType[] = state.brickTypes;

            for(let i = 0; i < allBrickTypes.length; i++){
                if(allBrickTypes[i]._id === deletedId){
                    allBrickTypes.splice(i,1);
                }
            }

            return {
                ...state,
                brickTypes: allBrickTypes,
            };
        }

        // Add Brick Type Success
        case BrickTypeActions.BrickTypeActionTypes.brickTypeAddSuccess: {
            const newBrickType = action.payload;
            state.brickTypes.splice(state.brickTypes.length - 1, 0, newBrickType);

            console.log("IN REDUCER - ", newBrickType);
            
            return {
                ...state,
                brickTypes: state.brickTypes,
            };
        }

        // Update Brick Type Success
        case BrickTypeActions.BrickTypeActionTypes.brickTypeUpdateSuccess: {
            const updatedBrickType = action.brickType;
            
            var allBrickTypes: BrickType[] = state.brickTypes;

            for(let i = 0; i < allBrickTypes.length; i++){
                if(allBrickTypes[i]._id === updatedBrickType._id){
                    allBrickTypes[i] = updatedBrickType;;
                }
            }
            
            return {
                ...state,
                brickTypes: allBrickTypes,
            };
        }

        // Activate Brick Type Success
        case BrickTypeActions.BrickTypeActionTypes.brickTypeActivateSuccess: {
            const updatedBrickType = action.payload;
            
            var allBrickTypes: BrickType[] = state.brickTypes;

            for(let i = 0; i < allBrickTypes.length; i++){
                if(allBrickTypes[i]._id === updatedBrickType._id){
                    allBrickTypes[i] = updatedBrickType;;
                }
            }
            
            return {
                ...state,
                brickTypes: allBrickTypes,
            };
        }
        
        default: 
            return state;        
    }
}

export const getIds = (state: State) => state.ids;
export const getBrickTypes = (state: State) => state.brickTypes;
export const getSelected = (state: State) => state.selected;

export const getBrickTypeLoading = (state: State) => state.loading;
export const getBrickTypeLoaded = (state: State) => state.loaded;
