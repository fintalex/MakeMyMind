import { Component, OnInit, EventEmitter } from '@angular/core';
import { BrickType } from '../../models/brick-type.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../models/category.model';
import { DialogService } from '../../components/dialogs/dialog.service';
import { ModalParams } from '../../models/modal-params.model';

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

    private createBrickTypeEvent = new EventEmitter();
    private deleteBrickTypeEvent = new EventEmitter();
    private updateBrickTypeEvent = new EventEmitter();

    public brickTypeDetailsForm: FormGroup;

    constructor(private dialogs: DialogService) { }

    ngOnInit() {
        this.setDefaultFormValues();
    }

    ngOnChanges() {
        console.log("I am In ngOnCahanges");
        if (this.brickType) {
            this.brickTypeDetailsForm = new FormGroup({
                name: new FormControl(this.brickType.name),
                category: new FormControl(this.brickType.category._id),
                sign: new FormControl(this.brickType.sign),
                ruleDescription: new FormControl(this.brickType.ruleDescription),
                isPrivate: new FormControl(this.brickType.isPrivate)
            });
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
        this.updateBrickTypeEvent.emit(this.brickType);
    }

    private setDefaultFormValues() {
        this.brickTypeDetailsForm = new FormGroup({
            name: new FormControl(),
            category: new FormControl(),
            sign: new FormControl(),
            ruleDescription: new FormControl(),
            isPrivate: new FormControl(true)
        });
    }
}
