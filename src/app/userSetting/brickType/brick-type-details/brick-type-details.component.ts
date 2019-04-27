import { Component, OnInit, EventEmitter } from '@angular/core';
import { BrickType } from '../../../models/brick-type.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { ModalParams } from '../../../models/modal-params.model';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'underscore';
import { DataSvc } from 'app/services/data.service';

@Component({
    selector: 'brick-type-details',
    templateUrl: './brick-type-details.component.html',
    styleUrls: ['./brick-type-details.component.scss'],
    outputs: [
        'createBrickTypeEvent',
        'deleteBrickTypeEvent',
        'updateBrickTypeEvent'
    ],
    inputs: ['brickType', 'categoriesList']
})
export class BrickTypeDetailsComponent implements OnInit {

    brickType: BrickType;
    categoriesList: Category[];
    iconList: String[];

    private createBrickTypeEvent = new EventEmitter();
    private deleteBrickTypeEvent = new EventEmitter();
    private updateBrickTypeEvent = new EventEmitter();

    public brickTypeDetailsForm: FormGroup;
    //sign = new FormControl();
    frendsIconListResult: String[];
    selectedIcon: String;

    //displayFn: (icon: String) => String;

    constructor(private dialogs: DialogService,
                private dataSvc: DataSvc) { }

    //public _this = this;
    
    ngOnInit() {
        this.iconList = this.dataSvc.IconsList;
        this.setDefaultFormValues();
        //this.setValueChangesToSign();
        // this.brickTypeDetailsForm.controls.sign.valueChanges
        //     .pipe(debounceTime(300))
        //     .subscribe(data => {
        //         this.updateFilteredListIcon(data);
        //     });
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
                isIcon: new FormControl(this.brickType.isIcon)
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

    public createBrickType() {
        this.createBrickTypeEvent.emit(this.brickTypeDetailsForm.value);

        this.brickTypeDetailsForm.reset();
        
        this.setDefaultFormValues();
        //this.brickTypeDetailsForm.setValue({isPrivate: true});
    }

    public deleteBrickType() {
        var params: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите удалить привычку - ' + this.brickType.name + '?'
        };

        this.dialogs.showConfirm(params)
            .subscribe(result => {
                if (result){
                    this.deleteBrickTypeEvent.emit(this.brickType._id);
                    this.brickType = null;
                    this.brickTypeDetailsForm.reset();
                }
            });
    }

    public updateBrickType() {
        this.brickType.name = this.brickTypeDetailsForm.value.name;
        this.brickType.category = this.brickTypeDetailsForm.value.category;
        this.brickType.sign = this.brickTypeDetailsForm.value.sign;
        this.brickType.ruleDescription = this.brickTypeDetailsForm.value.ruleDescription;
        this.brickType.isPrivate = this.brickTypeDetailsForm.value.isPrivate;
        this.brickType.isIcon = this.brickTypeDetailsForm.value.isIcon;
        this.updateBrickTypeEvent.emit(this.brickType);
    }

    private setDefaultFormValues() {
        this.brickType = null;
        this.brickTypeDetailsForm = new FormGroup({
            name: new FormControl(),
            category: new FormControl(),
            sign: new FormControl(null, [Validators.required]),
            ruleDescription: new FormControl(),
            isPrivate: new FormControl(true),
            isIcon: new FormControl(false)
        });
        this.setValueChangesToSign();
    }
}