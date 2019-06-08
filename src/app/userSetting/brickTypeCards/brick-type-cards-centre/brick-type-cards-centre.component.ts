import { Component, OnInit } from '@angular/core';
import { BrickTypeService } from '../../brickType/brickType.service';
import { CategoryService } from '../../category/category.service';
import { BrickType } from '../../../models/brick-type.model';
import { MatDialog } from '@angular/material';
import { Category } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { ModalParams } from '../../../models/modal-params.model';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { UserService } from '../../../services/user.service';

import * as _ from 'underscore';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromBrickTypeSelectors from '../../../store/selectors/brickType.selectors';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'brick-type-cards-centre',
    templateUrl: './brick-type-cards-centre.component.html',
    styleUrls: ['./brick-type-cards-centre.component.scss']
})
export class BrickTypeCardsCentreComponent implements OnInit {

    existentBrickTypes: BrickType[];
    existentCategories: Category[];

    brickTypes$: Observable<BrickType[]>; 

    isSortBrickType: boolean = false;
    isRemovedShown: boolean = false;

    constructor(
                private brickTypeService: BrickTypeService,
                private categoryService: CategoryService,
                private authService: AuthService,
                private modalDialogs: DialogService,
                private userService: UserService,
                private router: Router,
                private store: Store<fromBrickTypeSelectors.State>
            ) { }

    ngOnInit() {
        this.brickTypes$ = this.store.pipe(select(fromBrickTypeSelectors.getBrickTypes));

        if (this.authService.CurrentUser.helper.brickTypeMainHelp && this.authService.CurrentUser.showHelpers){
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
        if (brickType) {
            this.router.navigate([`/brickTypePage/${brickType._id}`]);
        } else {
            this.router.navigate([`/brickTypePage`]);
        }
    }

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
        //debugger;
        this.brickTypeService.updateSkippedDays()
            .subscribe((results: any)=> {
                //debugger;
                console.log(results);
            });
    }
}
