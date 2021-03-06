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
import * as _ from 'underscore';

@Component({
    selector: 'app-brick-modal',
    templateUrl: './brick-modal.component.html',
    styleUrls: ['./brick-modal.component.scss']
})
export class BrickModalComponent implements OnInit{

    existentBrickTypes: BrickType[];

    curDate: string;

    curBrick: Brick;

    public brickDetailsForm: FormGroup = new FormGroup({
        brickType: new FormControl(),
        description: new FormControl(),
        date: new FormControl()
    });

    //brickTypeFC = new FormControl();

    constructor(
        private authService: AuthService,
        private brickService: BrickService,
        private dialogs: DialogService,
        public dialogRef: MatDialogRef<BrickModalComponent>,
        private datePipe: DatePipe,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {

        var nowDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

        this.curDate = this.datePipe.transform(this.data.curBrick.date, 'dd.MM.yyyy');

        this.existentBrickTypes = _.filter(this.data.brickTypes, (brickType: any) => brickType.status == 1 && (this.curDate != nowDate ? brickType.type == 1 : true));
        
        if(this.data.curBrick._id){
            //this.brickTypeFC.setValue(this.data.curBrick.brickType);
            var curBrickInExistent = _.find(this.existentBrickTypes, (br:any) => { 
                return br._id == this.data.curBrick.brickType._id;
            });

            this.brickDetailsForm = new FormGroup({
                brickType: new FormControl(curBrickInExistent),
                description: new FormControl(this.data.curBrick.description)
            });
        }
    }

    // createBrick() {
    //     this.brickDetailsForm.value.user = this.authService.CurrentUser._id;
    //     this.brickDetailsForm.value.date = this.data.curBrick.date;
    //     //this.brickDetailsForm.value.brickType = this.brickTypeFC.value._id;
        
    //     this.brickService.createBrick(this.brickDetailsForm.value)
    //         .subscribe(newBrick => {
    //             newBrick.status = 1; // created
    //             this.dialogRef.close(newBrick);
    //         });
    // }

    updateBrick(){
        this.brickDetailsForm.value.user = this.authService.CurrentUser._id;
        this.brickDetailsForm.value.date = this.data.curBrick.date;
        //this.brickDetailsForm.value.brickType = this.brickTypeFC.value._id;
        
        this.brickDetailsForm.value._id = this.data.curBrick._id;
       // this.brickDetailsForm.value.brickType = this.brickTypeFC.value._id;

        this.brickService.updateBrick(this.brickDetailsForm.value)
            .subscribe(updatedBrick => {
                updatedBrick.status = 2; // updated
                this.dialogRef.close(updatedBrick);
            });
    }

    deleteBrick(){
        var params: ModalParams = {
            width: '300px',
            message: 'Уверены, что хотите удалить действие?'
        };

        this.dialogs.showConfirm(params)
            .subscribe(result => {
                if (result){
                    this.brickService.deleteBrick(this.data.curBrick._id)
                    .subscribe(deletedBrick => {
                        deletedBrick.status = 3; // deleted
                        this.dialogRef.close(deletedBrick);
                    });
                }
            });
    }
    
    displayFn(brickType: BrickType) {
        if (brickType) { return brickType.name; }
    }
}