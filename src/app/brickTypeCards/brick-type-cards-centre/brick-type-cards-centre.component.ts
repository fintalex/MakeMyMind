import { Component, OnInit } from '@angular/core';
import { BrickTypeService } from '../../brickType/brickType.service';
import { CategoryService } from '../../category/category.service';
import { BrickType } from '../../models/brick-type.model';
import { BrickTypeModalComponent } from '../brick-type-modal/brick-type-modal.component';
import { MatDialog } from '@angular/material';
import { Category } from '../../models/category.model';
import { AuthService } from '../../services/auth.service';
import { ModalBrickTypeResult } from '../../models/dto/modal-brick-type-result';
import { ModalParams } from '../../models/modal-params.model';
import { DialogService } from '../../components/dialogs/dialog.service';
import { UserService } from '../../services/user.service';

import * as _ from 'underscore';

@Component({
    selector: 'brick-type-cards-centre',
    templateUrl: './brick-type-cards-centre.component.html',
    styleUrls: ['./brick-type-cards-centre.component.scss']
})
export class BrickTypeCardsCentreComponent implements OnInit {

    existentBrickTypes: BrickType[];
    existentCategories: Category[];

    isSortBrickType: boolean = false;
    isRemovedShown: boolean = false;

    constructor(
                private brickTypeService: BrickTypeService,
                private categoryService: CategoryService,
                private authService: AuthService,
                private dialog: MatDialog,
                private modalDialogs: DialogService,
                private userService: UserService
            ) { }

    ngOnInit() {
        if (!this.authService.CurrentUser.helper.brickTypeMainHelp){
            var bottomSheetParams: ModalParams = {
                disableClose: true, 
                okButtonTitle: "Понял", 
                cancelButtonTitle: "Пропустить",
                message: `Здесь ты можешь работать над своими <b class="chocolate">привычками</b>. 
                    Создавай <b class="chocolate">постоянную привычку</b> или <b class="chocolate">цель-привычку</b>.
                    Мы создали 3 постоянные и наиболее распространенные из них, которые 
                    будут важными для любого человека, но про которые мы часто забываем.
                    `
            };

            this.modalDialogs.showBottomSheet(bottomSheetParams)
                .subscribe((res)=>{
                    // here we must save or dismiss Understanding
                    this.authService.CurrentUser.helper.brickTypeMainHelp = res;
                    this.authService.updateCurrentUserInStorage();
                    this.userService.updateUserHelper(this.authService.CurrentUser)
                        .subscribe(res => console.log("User helper is updated"));
                });
        }

        this.brickTypeService.getBrickTypes()
            .subscribe(allBrickTypes => { 
                this.existentBrickTypes = allBrickTypes;
                var newBrickType = new BrickType();
                this.existentBrickTypes.push(newBrickType);                
            });

        this.categoryService.getCategories()
            .subscribe(allCategories => { 
                this.existentCategories = allCategories;
            });
    }

    openBrickModal(brickType: BrickType){
        var dialogRef = this.dialog.open(BrickTypeModalComponent, {
            width: '340px',
            //disableClose: true,  // use this feature for prevent closing window when we click on the backdrop
            //backdropClass: string // custom class for the backdrop (maybe for use this to show button in the circle)
            data: { 
                curBrickType: brickType,                
                existentCategories: this.existentCategories
            }
        });

        dialogRef.afterClosed().subscribe((result: ModalBrickTypeResult) => {
            if (result.action == 1){
                this.onCreateBrickType(result.brickType);
            } else if (result.action == 2){
                this.onUpdateBrickType(result.brickType);
            } else if (result.action == 3){
                this.onDeleteBrickType(result.brickTypeId);
            }
        });
    }

    onCreateBrickType(brickType: BrickType){
        brickType.user = this.authService.CurrentUser._id;
        this.brickTypeService.createBrickType(brickType)
            .subscribe(newBrickType => {
                //this.existentBrickTypes.push(newBrickType);
                this.existentBrickTypes.splice(this.existentBrickTypes.length - 1, 0, newBrickType);
            });
    }

    onUpdateBrickType(brickType: BrickType){
        var allBrickTypes = this.existentBrickTypes;
        this.brickTypeService.updateBrickType(brickType)
            .subscribe(updatedBrickType => {
                for(let i = 0; i < allBrickTypes.length; i++){
                    if(allBrickTypes[i]._id === updatedBrickType._id){
                        allBrickTypes[i] = updatedBrickType;;
                    }
                }
            })
    }

    onDeleteBrickType(id){
        var deletedId = id;
        var allBrickTypes = this.existentBrickTypes;
        this.brickTypeService.deleteBrickType(id)
            .subscribe(deletedBrickType => {
                for(let i = 0; i < allBrickTypes.length; i++){
                    if(allBrickTypes[i]._id === deletedId){
                    allBrickTypes.splice(i,1);
                    }
                }
            });
        //this.selectedBrickType = null;
    }

    sort(){
        this.existentBrickTypes = _.sortBy(this.existentBrickTypes, (briTyp: BrickType) => { 
            return this.isSortBrickType ? (briTyp.category ? briTyp.category._id : false) : (briTyp._id);
        });
    }

    showRemoved() {
        //this.isRemovedShown = !this.isRemovedShown;
    }

    filterBrickType(){
        var filteredBricksTypes = _.filter(this.existentBrickTypes, (briTyp: BrickType) => { 
            return !this.isRemovedShown && briTyp.isRemoved ? false : true;
        });

        return filteredBricksTypes;
    }
}
