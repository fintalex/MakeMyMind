import { Component, OnInit, EventEmitter } from '@angular/core';
import { BrickType } from '../../models/brick-type.model';

import * as _ from 'underscore';
import { FrendService } from '../../frend/frend.service';
import { Frend } from '../../models/Frend.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'wall-side-nav',
    templateUrl: './wall-side-nav.component.html',
    styleUrls: ['./wall-side-nav.component.scss'],
    inputs: ['visibleBrickTypes', 'nickName'],
    outputs: ['tickBrickType']
})
export class WallSideNavComponent implements OnInit {

    nickName: string;
    visibleBrickTypes: BrickType[];
    userFrends: Frend[];

    private tickBrickType = new EventEmitter();

    sideBarExpanded: boolean = false;
    habbitExpanded: boolean = false;

    constructor(
            private frendService: FrendService,
            private authService: AuthService, 
            private userService: UserService) { }

    ngOnChanges() {
        if(this.visibleBrickTypes){
            var allBrickType = new BrickType();
            allBrickType.name = 'Все привычки';
            allBrickType.ticked = true;
            //this.visibleBrickTypes.unshift(allBrickType);
        }
    }

    ngOnInit() {
        this.sideBarExpanded = this.authService.CurrentUser.helper.wallSideNavShow;

        this.frendService.getFrends()   
            .subscribe(allFrends => {
                this.userFrends = allFrends;
            });
    }

    toogleSideBar() {
        this.sideBarExpanded = !this.sideBarExpanded;

        this.authService.CurrentUser.helper.wallSideNavShow = this.sideBarExpanded;
        this.authService.updateCurrentUserInStorage();
        this.userService.updateUserHelper(this.authService.CurrentUser)
            .subscribe(res => console.log("User helper is updated"));
    }

    toogleHabbitMap() {
        this.habbitExpanded = !this.habbitExpanded;
    }

    tickHabbit(habbit: BrickType){
        // here we need to generate event for parrent component
        
        // TODO: before send event we need: 
        // to MAP only ids of Ticked Habbits.
        // also need to Untick

        var filteredHabbits = [];
       
        _.forEach(this.visibleBrickTypes, (hab: BrickType) => {
            if(!habbit._id && hab._id){
                hab.ticked = false;
            } else if (habbit._id && !hab._id){
                hab.ticked = false;
            }

            if (hab.ticked && hab._id){
                filteredHabbits.push(hab._id);
            }
        });

        this.tickBrickType.emit(filteredHabbits);
    }
}
