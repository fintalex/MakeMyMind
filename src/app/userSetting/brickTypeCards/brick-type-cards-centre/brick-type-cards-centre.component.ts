import { Component, OnInit } from '@angular/core';
import { BrickTypeService } from '../../brickType/brickType.service';
import { CategoryService } from '../../category/category.service';
import { BrickType } from '../../../models/brick-type.model';
import { BrickTypeModalComponent } from '../brick-type-modal/brick-type-modal.component';
import { MatDialog } from '@angular/material';
import { Category } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { ModalBrickTypeResult } from '../../../models/dto/modal-brick-type-result';
import { ModalParams } from '../../../models/modal-params.model';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { UserService } from '../../../services/user.service';

import * as _ from 'underscore';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromBrickTypeSelectors from '../../../store/selectors/brickType.selectors';
import * as brickTypeAction from '../../../store/actions/brickTypes';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'brick-type-cards-centre',
    templateUrl: './brick-type-cards-centre.component.html',
    styleUrls: ['./brick-type-cards-centre.component.scss']
})
export class BrickTypeCardsCentreComponent implements OnInit {

    existentBrickTypes: BrickType[];
    existentCategories: Category[];

    //newBrickType: BrickType = new BrickType();

    brickTypes$: Observable<BrickType[]>; 

    isSortBrickType: boolean = false;
    isRemovedShown: boolean = false;

    constructor(
                private brickTypeService: BrickTypeService,
                private categoryService: CategoryService,
                private authService: AuthService,
                private dialog: MatDialog,
                private modalDialogs: DialogService,
                private userService: UserService,

                private store: Store<fromBrickTypeSelectors.State>
            ) { }

    ngOnInit() {
        this.brickTypes$ = this.store.pipe(select(fromBrickTypeSelectors.getBrickTypes));

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
            .subscribe((allBrickTypes: any) => { 
                this.existentBrickTypes = allBrickTypes;
                var newBrickType = new BrickType();
                this.existentBrickTypes.push(newBrickType);                
            });

        this.categoryService.getCategories()
            .subscribe((allCategories: any) => { 
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
        this.store.dispatch(new brickTypeAction.AddBrickType(brickType));
        // brickType.user = this.authService.CurrentUser._id;
        // this.brickTypeService.createBrickType(brickType)
        //     .subscribe((newBrickType: any) => {
        //         //this.existentBrickTypes.push(newBrickType);
        //         this.existentBrickTypes.splice(this.existentBrickTypes.length - 1, 0, newBrickType);
        //     });
    }

    onUpdateBrickType(brickType: BrickType){
        this.store.dispatch(new brickTypeAction.UpdateBrickType(brickType));
        // var allBrickTypes = this.existentBrickTypes;
        // this.brickTypeService.updateBrickType(brickType)
        //     .subscribe((updatedBrickType: any) => {
        //         for(let i = 0; i < allBrickTypes.length; i++){
        //             if(allBrickTypes[i]._id === updatedBrickType._id){
        //                 allBrickTypes[i] = updatedBrickType;;
        //             }
        //         }
        //     })
    }

    onDeleteBrickType(id){
        this.store.dispatch(new brickTypeAction.RemoveBrickType(id));
        // var deletedId = id;
        // var allBrickTypes = this.existentBrickTypes;
        // this.brickTypeService.deleteBrickType(id)
        //     .subscribe(deletedBrickType => {
        //         for(let i = 0; i < allBrickTypes.length; i++){
        //             if(allBrickTypes[i]._id === deletedId){
        //             allBrickTypes.splice(i,1);
        //             }
        //         }
        //     });
    } 

    // sort(): Observable<BrickType[]>{
    //     // this.existentBrickTypes = _.sortBy(this.existentBrickTypes, (briTyp: BrickType) => { 
    //     //     return this.isSortBrickType ? (briTyp.category ? briTyp.category._id : false) : (briTyp._id);
    //     // });
    // }

    // showRemoved() {
    //     //this.isRemovedShown = !this.isRemovedShown;
    // }

    filterBrickType(): Observable<BrickType[]>{
        return this.brickTypes$
            .pipe( 
                map(brickTypes => {
                    var filteredBrickTypes = brickTypes
                        .sort((x,y) => this.isSortBrickType ? (x.category._id < y.category._id ? -1 : 1) : (x._id < y._id ? -1 : 1))
                        .filter((briTyp: BrickType) => !this.isRemovedShown && briTyp.status == 2 ? false : true);


                    var newBrickType = new BrickType();
                    filteredBrickTypes.push(newBrickType); 
                    return filteredBrickTypes;
                })
            );
    }

    // here just only for test 
    updateSkippedDaysForPeriod(){
        debugger;
        this.brickTypeService.updateSkippedDays()
            .subscribe((results: any)=> {
                debugger;
                console.log(results);
            });
    }
}
