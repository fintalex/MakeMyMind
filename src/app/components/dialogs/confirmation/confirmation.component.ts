import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ConfirmationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okButton() {
    this.dialogRef.close(true);
  }

  cancelButton(){
    this.dialogRef.close(false);
  }
}
