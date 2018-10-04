import { Injectable } from '@angular/core';
import { MatDialog, MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { ConfirmationModalComponent } from './confirmation/confirmation.component';
import { ModalParams } from '../../models/modal-params.model';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Injectable()
export class DialogService {

    constructor(
        private dialog: MatDialog,
        private matBottomSheet: MatBottomSheet) { }

    showConfirm(modalParams: ModalParams){
        var dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: modalParams.width,
            data: { 
                title: modalParams.title,
                message: modalParams.message
            }
        });

        return dialogRef.afterClosed();
    }

    showBottomSheet(modalParams: ModalParams){
        var bottomSheetParams: MatBottomSheetConfig = {
            data: modalParams,
            disableClose: modalParams.disableClose
        };

        var botSheetRef = this.matBottomSheet.open(BottomSheetComponent, bottomSheetParams);

        return botSheetRef.afterDismissed();
    }
}
