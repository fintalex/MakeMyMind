import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackBarComponent } from 'app/components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    showSuccess(snack: MatSnackBarConfig) {
        snack.duration = snack.duration || 3000;
        snack.panelClass = snack.panelClass || "success-class";
        snack.verticalPosition = snack.verticalPosition || "bottom";
        this.snackBar.openFromComponent(SnackBarComponent, snack);
    }

    showError(snack: MatSnackBarConfig){
        //this.snackBar.open(snack.data.message, 'Error', { verticalPosition: 'top', duration: 3000, panelClass: "error-class" })
        snack.duration = snack.duration || 3000;
        snack.panelClass = snack.panelClass || "error-class";
        snack.verticalPosition = snack.verticalPosition || "bottom";
        this.snackBar.openFromComponent(SnackBarComponent, snack);
    }

    showWarning(snack: MatSnackBarConfig){
        snack.duration = snack.duration || 3000;
        snack.panelClass = snack.panelClass || 'warning-class';
        snack.verticalPosition = snack.verticalPosition || "bottom";
        this.snackBar.openFromComponent(SnackBarComponent, snack);
    }

    showInfo(snack: MatSnackBarConfig){
        snack.duration = snack.duration || 3000;
        snack.panelClass = snack.panelClass || 'info-class';
        snack.verticalPosition = snack.verticalPosition || "bottom";
        this.snackBar.openFromComponent(SnackBarComponent, snack);
    }
}
