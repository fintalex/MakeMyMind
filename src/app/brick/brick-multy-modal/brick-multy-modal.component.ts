import { Component, OnInit, Inject } from '@angular/core';
import { BrickService } from '../../brick/brick.service';
import { Brick } from '../../models/brick.model';
import { BrickType } from '../../models/brick-type.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../components/dialogs/dialog.service';
import { ModalParams } from '../../models/modal-params.model';
//import * as _ from 'underscore';
import * as _ from 'underscore';

@Component({
  selector: 'brick-multy-modal',
  templateUrl: './brick-multy-modal.component.html',
  styleUrls: ['./brick-multy-modal.component.scss']
})
export class BrickMultyModalComponent implements OnInit {

    existentBrickTypes: BrickType[];

    curDate: string;

    curBrick: Brick;

    clicked = false;

    public brickDetailsForm: FormGroup = new FormGroup({
        brickTypeArray: new FormControl(),
        description: new FormControl(),
        date: new FormControl()
    });

    constructor(
        private authService: AuthService,
        private brickService: BrickService,
        private dialogs: DialogService,
        public dialogRef: MatDialogRef<BrickMultyModalComponent>,
        private datePipe: DatePipe,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {

        var nowDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

        this.curDate = this.datePipe.transform(this.data.curBrick.date, 'dd.MM.yyyy');

        this.existentBrickTypes = _.filter(this.data.brickTypes, (brickType: any) => brickType.status == 1 && (this.curDate != nowDate ? brickType.type == 1 : true));
        
        if(this.data.curBrick._id){
            var curBrickInExistent = _.find(this.existentBrickTypes, (br:any) => { 
                return br._id == this.data.curBrick.brickType._id;
            });

            this.brickDetailsForm = new FormGroup({
                brickTypeArray: new FormControl([curBrickInExistent]),
                description: new FormControl(this.data.curBrick.description)
            });
        }
    }

    createBricks() {
        console.log('CREATE BRICKS');
        this.brickDetailsForm.value.user = this.authService.CurrentUser._id;
        this.brickDetailsForm.value.date = this.data.curBrick.date;

        if (this.brickDetailsForm.value.brickTypeArray.length > 1) {
            this.brickDetailsForm.value.description = '';
        }
        
        this.brickService.createMultyBrick(this.brickDetailsForm.value)
            .subscribe(createdBrickArray => {
                var res = {
                    status: 1,
                    bricksArray: createdBrickArray
                };
                this.dialogRef.close(res);
            });
    }

    // updateBrick(){
    //     this.brickDetailsForm.value.user = this.authService.CurrentUser._id;
    //     this.brickDetailsForm.value.date = this.data.curBrick.date;
    //     // this.brickDetailsForm.value.brickType = this.brickTypeFC.value._id;
        
    //     this.brickDetailsForm.value._id = this.data.curBrick._id;
    //     // this.brickDetailsForm.value.brickType = this.brickTypeFC.value._id;

    //     this.brickService.updateBrick(this.brickDetailsForm.value)
    //         .subscribe(updatedBrick => {
    //             updatedBrick.status = 2; // updated
    //             this.dialogRef.close(updatedBrick);
    //         });
    // }

    // deleteBrick(){
    //     var params: ModalParams = {
    //         width: '300px',
    //         message: 'Уверены, что хотите удалить действие?'
    //     };

    //     this.dialogs.showConfirm(params)
    //         .subscribe(result => {
    //             if (result){
    //                 this.brickService.deleteBrick(this.data.curBrick._id)
    //                 .subscribe(deletedBrick => {
    //                     deletedBrick.status = 3; // deleted
    //                     this.dialogRef.close(deletedBrick);
    //                 });
    //             }
    //         });
    // }

}
