import { Component, OnInit, EventEmitter } from '@angular/core';

import { BrickType } from '../../models/brick-type.model';
import { Category } from '../../models/category.model';

import * as _ from 'underscore';
import { FrendService } from '../../userSetting/frend/frend.service';
import { Frend } from '../../models/Frend.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as categorySelectors from '../../store/selectors/category.selectors';
import * as categoryAction from '../../store/actions/categories';
import * as brickTypeSelectors from '../../store/selectors/brickType.selectors';
import * as brickTypeAction from '../../store/actions/brickTypes';

@Component({
    selector: 'wall-side-nav',
    templateUrl: './wall-side-nav.component.html',
    styleUrls: ['./wall-side-nav.component.scss'],
    inputs: ['visibleBrickTypes', 'nickName'],
    outputs: ['tickBrickType', 'tickCategory']
})
export class WallSideNavComponent implements OnInit {

    nickName: string;
    
    userFrends: Frend[];

    private tickBrickType = new EventEmitter();
    private tickCategory = new EventEmitter();

    sideBarExpanded: boolean = false;
    //habbitExpanded: boolean = false;

    categories$: Observable<Category[]>;
    brickTypes$: Observable<BrickType[]>;
    //visibleBrickTypes: BrickType[];

    constructor(
        private frendService: FrendService,
        private authService: AuthService, 
        private userService: UserService,
        private store: Store<categorySelectors.State>) { }

    ngOnChanges() {

        // if(this.visibleBrickTypes){
        //     var allBrickType = new BrickType();
        //     allBrickType.name = 'Все привычки';
        //     allBrickType.ticked = true;
        //     //this.visibleBrickTypes.unshift(allBrickType);
        // }
    }

    ngOnInit() {

        this.frendService.getFrends()   
            .subscribe((allFrends: any) => {
                this.userFrends = allFrends;
            });      

        //this.sideBarExpanded = this.authService.CurrentUser.helper.wallSideNavShow;      

        this.categories$ = this.store.select(categorySelectors.getAllCategories);
        this.brickTypes$ = this.store.pipe(select(brickTypeSelectors.getBrickTypes));
        //this.brickTypes$ = this.store.select(brickTypeSelectors.getBrickTypes);
    }

    toogleSideBar() {
        this.sideBarExpanded = !this.sideBarExpanded;

        this.authService.CurrentUser.helper.wallSideNavShow = this.sideBarExpanded;
        this.authService.updateCurrentUserInStorage();
        this.userService.updateUserHelper(this.authService.CurrentUser)
            .subscribe(res => console.log("User helper is updated"));
    }

    // toogleHabbitMap() {
    //     this.habbitExpanded = !this.habbitExpanded;
    // }

    tickHabbit(habbit: BrickType){

        var filteredHabbits = [];
       
        // _.forEach(this.brickTypes$.forEach, (hab: BrickType) => {
        //     if(!habbit._id && hab._id){
        //         hab.ticked = false;
        //     } else if (habbit._id && !hab._id){
        //         hab.ticked = false;
        //     }

        //     if (hab.ticked && hab._id){
        //         filteredHabbits.push(hab._id);
        //     }
        // });

        this.brickTypes$
            .subscribe((brickTypes: BrickType[]) => {
                _.forEach(brickTypes, (hab: BrickType) => {
                    if(!habbit._id && hab._id){
                        hab.ticked = false;
                    } else if (habbit._id && !hab._id){
                        hab.ticked = false;
                    }
        
                    if (hab.ticked && hab._id){
                        filteredHabbits.push(hab._id);
                    }
                });
            });

        this.tickBrickType.emit(filteredHabbits);
    }

    tickCategoryCheckBox(category: Category){
        // Honestly Ideally, here we need to perform Action for Store - TickCategory
        // And in the store save ticked Category.

        var filteredCategories = [];

        this.categories$
            .subscribe((categories: Category[]) => {
                _.forEach(categories, (cat: Category) => {
                    if(!category._id && cat._id){
                        cat.ticked = false;
                    } else if (category._id && !cat._id){
                        cat.ticked = false;
                    }
        
                    if (cat.ticked && cat._id){
                        filteredCategories.push(cat._id);
                    }
                });
            });

        this.tickCategory.emit(filteredCategories);
    }
}
