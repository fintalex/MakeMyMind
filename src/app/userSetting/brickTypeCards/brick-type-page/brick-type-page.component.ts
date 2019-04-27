import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { BrickType } from '../../../models/brick-type.model';
import { Category } from '../../../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ModalParams } from '../../../models/modal-params.model';
import * as _ from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as categorySelector from '../../../store/selectors/category.selectors';
import { Observable } from 'rxjs';
import * as brickTypeAction from '../../../store/actions/brickTypes';
import { AuthService } from 'app/services/auth.service';
import { BrickTypeService } from 'app/userSetting/brickType/brickType.service';
import { DataSvc } from 'app/services/data.service';


@Component({
  selector: 'brick-type-page',
  templateUrl: './brick-type-page.component.html',
  styleUrls: ['./brick-type-page.component.scss']
})
export class BrickTypePageComponent implements OnInit {

    brickType: BrickType;
    categoriesList: Observable<Category[]>;
    iconList: String[];

    public brickTypeDetailsForm: FormGroup;
    frendsIconListResult: String[];
    selectedIcon: String;

    constructor(
            private dialogs: DialogService,
            private router: Router,
            private route: ActivatedRoute,
            private store: Store<categorySelector.State>,
            private authService: AuthService,
            private bricktypeService: BrickTypeService, 
            private dataSvc: DataSvc) { }

    ngOnInit() {
        //this.setIconList();
        this.iconList = this.dataSvc.IconsList;
        this.setDefaultFormValues();
        //this.setValueChangesToSign();
        // this.brickTypeDetailsForm.controls.sign.valueChanges
        //     .pipe(debounceTime(300))
        //     .subscribe(data => {
        //         this.updateFilteredListIcon(data);
        //     });

        this.categoriesList = this.store.pipe(select(categorySelector.getAllCategories));

        var brTpId = this.route.snapshot.paramMap.get('id');
        //var brTpId = this.route.snapshot.queryParams['id'];

        if(brTpId){
            this.bricktypeService.getBrickType(brTpId)
                .subscribe(brType => {
                    this.brickType = brType;
                    this.ngOnChanges();
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
        this.setBrickTypeFormValue();
        this.store.dispatch(new brickTypeAction.ActivateBrickType(this.brickType));
        this.router.navigate(['/brickTypeCards']);
    }

    public createBrickType() {
        this.setBrickTypeFormValue();
        this.brickType.user = this.authService.CurrentUser._id;
        this.store.dispatch(new brickTypeAction.AddBrickType(this.brickType));
        this.router.navigate(['/brickTypeCards']);
    }

    public updateBrickType() {
        this.setBrickTypeFormValue();
        this.store.dispatch(new brickTypeAction.UpdateBrickType(this.brickType));        
        this.router.navigate(['/brickTypeCards']);
    }

    public deleteBrickType() {
        var params: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите удалить привычку - ' + this.brickType.name + '?'
        };

        this.dialogs.showConfirm(params)
            .subscribe(result => {
                if (result){                    
                    this.store.dispatch(new brickTypeAction.RemoveBrickType(this.brickType._id));
                    this.router.navigate(['/brickTypeCards']);
                }
            });
    }

    setBrickTypeFormValue() {
        if (!this.brickType) {
            this.brickType = new BrickType();
        }
        this.brickType.name = this.brickTypeDetailsForm.value.name;
        this.brickType.category = this.brickTypeDetailsForm.value.category;
        this.brickType.sign = this.brickTypeDetailsForm.value.sign;
        this.brickType.ruleDescription = this.brickTypeDetailsForm.value.ruleDescription;
        this.brickType.isPrivate = this.brickTypeDetailsForm.value.isPrivate;
        this.brickType.isIcon = this.brickTypeDetailsForm.value.isIcon;
        this.brickType.type = this.brickTypeDetailsForm.value.type;
        this.brickType.allowedSkipDays = this.brickTypeDetailsForm.value.allowedSkipDays;
        this.brickType.neededDays = this.brickTypeDetailsForm.value.neededDays;
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
