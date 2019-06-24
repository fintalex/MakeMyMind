import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { BrickType } from '../../../models/brick-type.model';
import { Category } from '../../../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ModalParams } from '../../../models/modal-params.model';
import * as _ from 'underscore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalBrickTypeResult } from '../../../models/dto/modal-brick-type-result';
import { CloseBrickTypeResult } from '../../../models/enums/close-brick-type-action';
import { DataSvc } from 'app/services/data.service';

@Component({
  selector: 'app-brick-type-modal',
  templateUrl: './brick-type-modal.component.html',
  styleUrls: ['./brick-type-modal.component.scss']
})
export class BrickTypeModalComponent implements OnInit {

    brickType: BrickType;
    categoriesList: Category[];
    iconList: String[];

    public brickTypeDetailsForm: FormGroup;
    frendsIconListResult: String[];
    selectedIcon: String;

    constructor(
            private dialogs: DialogService,
            private dataSvc: DataSvc,
            public dialogRef: MatDialogRef<BrickTypeModalComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.iconList = this.dataSvc.IconsList;
        this.setDefaultFormValues();
        //this.setValueChangesToSign();
        // this.brickTypeDetailsForm.controls.sign.valueChanges
        //     .pipe(debounceTime(300))
        //     .subscribe(data => {
        //         this.updateFilteredListIcon(data);
        //     });

        if (this.data.existentCategories){
            this.categoriesList = this.data.existentCategories;
        }

        if (this.data.curBrickType._id){
            this.brickType = this.data.curBrickType;

            this.brickTypeDetailsForm = new FormGroup({
                name: new FormControl(this.data.curBrickType.name),
                category: new FormControl(this.data.curBrickType.category._id),
                sign: new FormControl(this.data.curBrickType.sign, [Validators.required]),
                ruleDescription: new FormControl(this.data.curBrickType.ruleDescription),
                isPrivate: new FormControl(this.data.curBrickType.isPrivate),
                isIcon: new FormControl(this.data.curBrickType.isIcon),
                type: new FormControl(this.data.curBrickType.type),
                neededDays: new FormControl(this.data.curBrickType.neededDays, [Validators.min(3)]),
                allowedSkipDays: new FormControl(this.data.curBrickType.allowedSkipDays, [Validators.min(0)]),
            });
        }
    }

    ngOnChanges() {
        console.log("I am In ngOnCahanges");
        if (this.brickType) {
            this.brickTypeDetailsForm = new FormGroup({
                name: new FormControl(this.brickType.name),
                category: new FormControl(this.brickType.category._id),
                sign: new FormControl(this.brickType.sign,[Validators.required]),
                ruleDescription: new FormControl(this.brickType.ruleDescription),
                isPrivate: new FormControl(this.brickType.isPrivate),
                isIcon: new FormControl(this.brickType.isIcon),
                type: new FormControl(this.brickType.type),
                neededDays: new FormControl(this.brickType.neededDays, [Validators.min(3)]),
                allowedSkipDays: new FormControl(this.brickType.allowedSkipDays, [Validators.min(0)]),
            });
            this.setValueChangesToSign();
        }

        //this.setValueChangesToSign();
        // this.brickTypeDetailsForm.controls.sign.valueChanges
        //     .pipe(debounceTime(300))
        //     .subscribe(data => {
        //         this.updateFilteredListIcon(data);
        //     });

        //this.updateFilteredListIcon(this.brickTypeDetailsForm.controls.sign.value);
    }

    setValueChangesToSign(){
        if(this.brickTypeDetailsForm){
            this.brickTypeDetailsForm.controls.sign.valueChanges
                .pipe(debounceTime(300))
                .subscribe(data => {
                    if(data != this.selectedIcon){
                        this.selectedIcon = data;
                        this.brickTypeDetailsForm.controls.isIcon.setValue(false);
                    }
                    this.updateFilteredListIcon(data);
                });
        }
    }

    updateFilteredListIcon(data){
        this.frendsIconListResult = _.filter(this.iconList, (icon: String) => {
            return icon.includes(data);
        });
    }

    getDisplayFn() {
        return (val) => this.displayFn(val);
    }
    
    displayFn(icon) {
        if (icon) { 
            if(_.any(this.iconList, (curIcon: String) => icon == curIcon)){                
                this.brickTypeDetailsForm.controls.isIcon.setValue(true);
                this.selectedIcon = icon;
            }
            return icon; 
        }
    }

    typeChanged(){
        if(this.brickTypeDetailsForm.value.type == 1){
            this.brickTypeDetailsForm.controls.allowedSkipDays.setValue(this.brickTypeDetailsForm.value.allowedSkipDays ? this.brickTypeDetailsForm.value.allowedSkipDays : 0);
            this.brickTypeDetailsForm.controls.neededDays.setValue(this.brickTypeDetailsForm.value.neededDays ? this.brickTypeDetailsForm.value.neededDays : 0);
        } else {
            this.brickTypeDetailsForm.controls.allowedSkipDays.setValue(this.brickTypeDetailsForm.value.allowedSkipDays != 0 ? this.brickTypeDetailsForm.value.allowedSkipDays : 3);
            this.brickTypeDetailsForm.controls.neededDays.setValue(this.brickTypeDetailsForm.value.neededDays != 0 ? this.brickTypeDetailsForm.value.neededDays : 21);
        }
    }

    public activateBrickType() {
        this.brickType.name = this.brickTypeDetailsForm.value.name;
        this.brickType.category = this.brickTypeDetailsForm.value.category;
        this.brickType.sign = this.brickTypeDetailsForm.value.sign;
        this.brickType.ruleDescription = this.brickTypeDetailsForm.value.ruleDescription;
        this.brickType.isPrivate = this.brickTypeDetailsForm.value.isPrivate;
        this.brickType.isIcon = this.brickTypeDetailsForm.value.isIcon;
        this.brickType.type = this.brickTypeDetailsForm.value.type;
        this.brickType.allowedSkipDays = this.brickTypeDetailsForm.value.allowedSkipDays;
        this.brickType.neededDays = this.brickTypeDetailsForm.value.neededDays;

        var res: ModalBrickTypeResult = {brickType: this.brickType, action: CloseBrickTypeResult.Activate};
        this.dialogRef.close(res);
    }

    public createBrickType() {
        var res: ModalBrickTypeResult = {brickType: this.brickTypeDetailsForm.value, action: CloseBrickTypeResult.Create};
        this.dialogRef.close(res);
    }

    public updateBrickType() {
        this.brickType.name = this.brickTypeDetailsForm.value.name;
        this.brickType.category = this.brickTypeDetailsForm.value.category;
        this.brickType.sign = this.brickTypeDetailsForm.value.sign;
        this.brickType.ruleDescription = this.brickTypeDetailsForm.value.ruleDescription;
        this.brickType.isPrivate = this.brickTypeDetailsForm.value.isPrivate;
        this.brickType.isIcon = this.brickTypeDetailsForm.value.isIcon;
        this.brickType.type = this.brickTypeDetailsForm.value.type;
        this.brickType.allowedSkipDays = this.brickTypeDetailsForm.value.allowedSkipDays;
        this.brickType.neededDays = this.brickTypeDetailsForm.value.neededDays;

        var res: ModalBrickTypeResult = {brickType: this.brickType, action: CloseBrickTypeResult.Update};
        this.dialogRef.close(res);
    }

    public deleteBrickType() {
        var params: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите удалить привычку - ' + this.brickType.name + '?'
        };

        this.dialogs.showConfirm(params)
            .subscribe(result => {
                if (result){
                    var res: ModalBrickTypeResult = {brickTypeId: this.brickType._id, action: CloseBrickTypeResult.Delete};

                    this.brickType = null;
                    this.brickTypeDetailsForm.reset();
                    
                    this.dialogRef.close(res);
                }
            });
    }

    private setDefaultFormValues() {
        this.brickType = null;
        this.brickTypeDetailsForm = new FormGroup({
            name: new FormControl(),
            category: new FormControl(),
            sign: new FormControl(null, [Validators.required]),
            ruleDescription: new FormControl(),
            isPrivate: new FormControl(true),
            isIcon: new FormControl(false),
            type: new FormControl(1),
            neededDays: new FormControl(21, [Validators.min(3)]),
            allowedSkipDays: new FormControl(3, [Validators.min(0)]),
        });
        this.setValueChangesToSign();
    }
}
