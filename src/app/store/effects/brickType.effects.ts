import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, startWith } from 'rxjs/operators';

import { BrickTypeActionTypes, LoadBrickTypesSuccess, ErrorBrickType, LoadBrickTypes, 
    RemoveBrickType, AddBrickType, AddBrickTypeSuccess, RemoveBrickTypeSuccess, UpdateBrickType, UpdateBrickTypeSuccess} from '../../store/actions/brickTypes';
import { BrickTypeService } from '../../userSetting/brickType/brickType.service';

@Injectable()
export class BrickTypeEffects {
    constructor(
        private actions$: Actions,
        private brickTypeService: BrickTypeService
    ) {}

    @Effect()
    loadBrickType$ = this.actions$.pipe(
        ofType(BrickTypeActionTypes.brickTypeLoad),
        startWith(new LoadBrickTypes()),
        switchMap(() => {
            return this.brickTypeService
                .getBrickTypes()
                .pipe(
                    map(brickTypes => {
                        return new LoadBrickTypesSuccess(brickTypes);
                    }),
                    catchError(error => of(new ErrorBrickType(error)))
                );
            }
        )
    );

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
}