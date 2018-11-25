import { Action } from '@ngrx/store';
import { BrickType } from '../../models/brick-type.model';

export enum BrickTypeActionTypes {
    brickTypeSelect        = '[BrickTypes] Select',
    brickTypeAdd           = '[BrickTypes] Add',
    brickTypeAddSuccess    = '[BrickTypes] Add Success',
    brickTypeLoad          = '[BrickTypes] Load',
    brickTypeLoadSuccess   = '[BrickTypes] Load success', 
    brickTypeRemove        = '[BrickTypes] Remove',
    brickTypeRemoveSuccess = '[BrickTypes] Remove Success',
    brickTypeUpdate        = '[BrickTypes] Update',
    brickTypeUpdateSuccess = '[BrickTypes] Update Success',
    brickTypeError         = '[BrickTypes] Error',
}

// SELECT
export class Select implements Action {
    readonly type = BrickTypeActionTypes.brickTypeSelect;
    constructor(public payload: number) { }
}

// ADD
export class AddBrickType implements Action {
    readonly type = BrickTypeActionTypes.brickTypeAdd;
    constructor(public payload: BrickType) { }
}
export class AddBrickTypeSuccess implements Action {
    readonly type = BrickTypeActionTypes.brickTypeAddSuccess;
    constructor(public payload: BrickType) { }
}

// LOAD
export class LoadBrickTypes implements Action {
    readonly type = BrickTypeActionTypes.brickTypeLoad;
}
export class LoadBrickTypesSuccess implements Action {
    readonly type = BrickTypeActionTypes.brickTypeLoadSuccess;
    constructor(public payload: BrickType[]) {}
}

// REMOVE
export class RemoveBrickType implements Action {
    readonly type = BrickTypeActionTypes.brickTypeRemove;
    constructor(public id: string) { }
}
export class RemoveBrickTypeSuccess implements Action {
    readonly type = BrickTypeActionTypes.brickTypeRemoveSuccess;
    constructor(public id: string) { }
}

// UPDATE
export class UpdateBrickType implements Action {
    readonly type = BrickTypeActionTypes.brickTypeUpdate;
    constructor(public brickType: BrickType) { }
}
export class UpdateBrickTypeSuccess implements Action {
    readonly type = BrickTypeActionTypes.brickTypeUpdateSuccess;
    constructor(public brickType: BrickType) { }
}

// ERROR
export class ErrorBrickType implements Action {
    readonly type = BrickTypeActionTypes.brickTypeError;
    constructor(public payload: any) {}
  }

export type Action = 
   | AddBrickType
   | AddBrickTypeSuccess
   | Select 
   | LoadBrickTypes 
   | LoadBrickTypesSuccess
   | RemoveBrickType
   | RemoveBrickTypeSuccess
   | UpdateBrickType
   | UpdateBrickTypeSuccess
   | ErrorBrickType;