import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackBarComponent } from 'app/components/snack-bar/snack-bar.component';
import { SnackSetting } from 'app/interfaces/snack-setting';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    showSuccess(snack: SnackSetting) {
        snack.duration = snack.duration || 3000;
        this.snackBar.openFromComponent(SnackBarComponent, snack);
    }

    showError(snack: SnackSetting){
        this.snackBar.open(snack.data.message, 'Error', { verticalPosition: 'top', duration: 3000, panelClass: "error-class" })
    }
}
