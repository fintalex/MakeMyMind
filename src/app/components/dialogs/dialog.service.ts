import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationModalComponent } from './confirmation/confirmation.component';
import { ModalParams } from '../../models/modal-params.model';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    showConfirm(modalParams: ModalParams){
        //var defer = $q.
        var dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: modalParams.width,
            data: { 
                title: modalParams.title,
                message: modalParams.message
            }
        });

        return dialogRef.afterClosed();
    }
}
