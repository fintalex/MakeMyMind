import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
//import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, startWith, mergeMap } from 'rxjs/operators';

import { BrickTypeActionTypes, LoadBrickTypesSuccess, ErrorBrickType, LoadBrickTypes, LoadBrickTypesAfterReload,
    RemoveBrickType, AddBrickType, AddBrickTypeSuccess, RemoveBrickTypeSuccess, UpdateBrickTypeInStore, UpdateBrickType, UpdateBrickTypeSuccess, ActivateBrickType, ActivateBrickTypeSuccess} from '../../store/actions/brickTypes';
import { BrickTypeService } from '../../userSetting/brickType/brickType.service';
import { of } from 'rxjs';

@Injectable()
export class BrickTypeEffects {
    constructor(
        private actions$: Actions,
        private brickTypeService: BrickTypeService
    ) {}

    @Effect()
    loadBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeLoad),
        switchMap((action: LoadBrickTypes) => this.loadBrickTypes())
    );

    loadBrickTypeAfterReload$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeLoadAfterReload),
        startWith(new LoadBrickTypesAfterReload()),
        switchMap(() => this.loadBrickTypes())
    );

    loadBrickTypes() {
        return this.brickTypeService
            .getBrickTypes()
            .pipe(
                map(brickTypes => {
                    //debugger;
                    return new LoadBrickTypesSuccess(brickTypes);
                }),
                catchError(error => of(new ErrorBrickType(error)))
            );
        }    

    @Effect()
    removeBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeRemove),
        switchMap((action: RemoveBrickType) => 
            this.brickTypeService
                .deleteBrickType(action.id)
                .pipe(
                    map(deletedBrickType => {
                        console.log("IN EFFECTS - ", deletedBrickType);
                        return new RemoveBrickTypeSuccess(action.id);
                    })
                )
            )
    );

    @Effect()
    addBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeAdd),
        switchMap((action: AddBrickType) => 
            this.brickTypeService
                .createBrickType(action.payload)
                .pipe(
                    map(newBrickType => {
                        console.log("IN EFFECTS - ", newBrickType);
                        return new AddBrickTypeSuccess(newBrickType);
                    })
                )
            )
    );

    @Effect()
    updateBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeUpdate),
        switchMap((action: UpdateBrickType) => 
            this.brickTypeService
                .updateBrickType(action.brickType)
                .pipe(
                    map(updatedBrickType => {
                        console.log("IN EFFECTS - ", updatedBrickType);
                        return new UpdateBrickTypeSuccess(updatedBrickType);
                    })
                )
            )
    );

    @Effect()
    activateBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeActivate),
        switchMap((action: ActivateBrickType) => 
            this.brickTypeService
                .activateBrickType(action.payload)
                .pipe(
                    map(activatedBrickType => {
                        return new ActivateBrickTypeSuccess(activatedBrickType);
                    })
                )
            )
    );

    // defenetly we don't need to use here - switchMap
    @Effect()
    updateBrickTypeInStore$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeUpdateInStore),
        mergeMap((action: UpdateBrickTypeInStore) => 
            this.brickTypeService
                .getBrickType(action.id)
                .pipe(
                    map(brickType => {
                        //debugger;
                        console.log("IN EFFECTS - UpdateBrickTypeInStore -", brickType);
                        return new UpdateBrickTypeSuccess(brickType);
                    })
                )
            )
    );
}