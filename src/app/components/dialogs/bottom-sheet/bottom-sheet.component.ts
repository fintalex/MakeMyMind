import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

    constructor(
            private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
            @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    ngOnInit() {
    }

    closeSheet(event: MouseEvent): void {
        this.bottomSheetRef.dismiss(true);
        event.preventDefault();
    }

    confirmSheet(event: MouseEvent){
        this.bottomSheetRef.dismiss(false);
        event.preventDefault();
    }
}
