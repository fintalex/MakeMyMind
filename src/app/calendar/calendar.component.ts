import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet } from '@angular/material';
import { BrickModalComponent } from '../brick/brick-modal/brick-modal.component';
import { BrickTypeService } from '../userSetting/brickType/brickType.service';
import { BrickType } from '../models/brick-type.model';
import { BrickService } from '../brick/brick.service';
import { Brick } from '../models/brick.model';
import * as _ from 'underscore';
import { RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BottomSheetComponent } from '../components/dialogs/bottom-sheet/bottom-sheet.component';
import { DialogService } from '../components/dialogs/dialog.service';
import { ModalParams } from '../models/modal-params.model';
import { UserService } from '../services/user.service';
import { BrickMultyModalComponent } from '../brick/brick-multy-modal/brick-multy-modal.component';
import { ComponentType } from '@angular/cdk/portal';

import { Store, select } from '@ngrx/store';
import * as fromBrickTypeSelectors from '../store/selectors/brickType.selectors';
import * as brickTypeAction from '../store/actions/brickTypes';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    daysArray = [];
    existentBrickTypes: BrickType[];
    brickInMonth: Brick[];
    curDate: Date = new Date();
    filteredHabbits = [];
    filteredCategories = [];

    curNick: string;
    nicknameForSideBar: string;

    testTooltip: "here will be two rows";
    sideBarExpanded: boolean = false;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        public authService: AuthService,
        private userService: UserService,
        private dialog: MatDialog,
        private brickTypeService: BrickTypeService, 
        private brickService: BrickService,
        private route: ActivatedRoute,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private bottomeSheet: MatBottomSheet,
        private modalDialogs: DialogService,
        private store: Store<fromBrickTypeSelectors.State>,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit() {
        
        this.activeRoute.params.subscribe(params => {     
            this.filteredHabbits = []; 
            this.filteredCategories = [];      
            this.updateWall()
        });

        if (!this.authService.CurrentUser.helper.calendarMainHelp){
            var bottomSheetParams: ModalParams = {
                disableClose: true, 
                okButtonTitle: "Понял", 
                cancelButtonTitle: "Пропустить",
                message: `<b class="chocolate">Календарь</b> для контроля своих <b class="chocolate">привычек</b>. 
                    Отмечай свои <b class="chocolate">постоянные привычки</b>, чтобы 
                    держать их все время на виду. Выкладывай свою стену будущего, так как наши привычки формируют
                    наши действия, а действия определяют будущее.`
            };

            this.modalDialogs.showBottomSheet(bottomSheetParams)
                .subscribe((res)=>{
                    // here we must save or dismiss Understanding
                    this.authService.CurrentUser.helper.calendarMainHelp = res;
                    this.authService.updateCurrentUserInStorage();
                    this.userService.updateUserHelper(this.authService.CurrentUser)
                        .subscribe(res => console.log("User helper is updated"));
                });
        }
    }

    updateWall(){
        this.curNick = this.route.snapshot.paramMap.get('nick');
        this.nicknameForSideBar = this.curNick ? this.curNick : this.authService.CurrentUser.nickname;

        this.brickTypeService.getBrickTypes(this.curNick)
            .subscribe((allBrickTypes: any) => {
                this.existentBrickTypes = allBrickTypes;
            });
            
        this.getBricksAndShowInMonth();
    }

    getBricksAndShowInMonth(){  
        
        this.brickService.getBricksForMonth(this.curDate, this.curNick, this.filteredHabbits, this.filteredCategories)
            .subscribe((allBricksInMonth: any) => {
                console.log("this.curDate", this.curDate);
                console.log("this.curNick", this.curNick);
                console.log("allBricksInMonth", allBricksInMonth);
                this.brickInMonth = allBricksInMonth;

                this.getMonthData(allBricksInMonth);
            });
    }

    getMonthData = (allBricks) => {
        this.daysArray = [];
        var monthDay = this.curDate.getDate();
        var weekDay = this.curDate.getDay();
        var monthNumber = this.curDate.getMonth();
        var dayInMonth = this.daysInMonth(this.curDate.getMonth(), this.curDate.getFullYear());
        var year = this.curDate.getFullYear();
        var dayToday = new Date();  //this.curDate;
        dayToday.setHours(0,0,0,0);

        for(var i = 1; i <= dayInMonth; i++){
            var newDay = new Date(year, monthNumber, i);
            var bricksForThisDay = _.filter(allBricks, (brick: any)=> {
                                            return (new Date(brick.date)).getTime() == newDay.getTime();
                                        });
            this.daysArray.push({
                'date': newDay,
                'disabled': dayToday.getTime() < newDay.getTime() ? true : false,
                'today': newDay.getTime() === dayToday.getTime(),
                'day': newDay.getDate(),
                'bricks': bricksForThisDay,
                'isWeekend': newDay.getDay() == 6 || newDay.getDay() == 0
            });
        }

        var firstDayInArray = this.daysArray[0];
        while (firstDayInArray.date.getDay() != 1){
            var previousDayDate = new Date(year, firstDayInArray.date.getMonth(), firstDayInArray.date.getDate() - 1);
            
            var previousDay = {
                'date': previousDayDate,
                'disabled': true,
                'today': false,
                'day': previousDayDate.getDate()
            };

            this.daysArray.unshift(previousDay);
            firstDayInArray = previousDay;
        }
    }

    // Month here is 1-indexed (January is 1, February is 2, etc). This is
    // because we're using 0 as the day so that it returns the last day
    // of the last month, so you have to add 1 to the month number 
    // so it returns the correct amount of days
    daysInMonth (month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    public openBrickModal(brick: Brick, day: any, event: any){       
        if (!brick){
            brick = new Brick();
            brick.date = day.date;
        } else {
            event.stopPropagation();
        }

        if (this.curNick || day.disabled){
            return;
        }

        if(!this.existentBrickTypes){
            this.brickTypeService.getBrickTypes(this.curNick)
                .subscribe((allBrickTypes: any) => {
                    this.existentBrickTypes = allBrickTypes;
                    this.openModal(brick, day);
                });
        } else { 
            this.openModal(brick, day);
        }        
    }

    openModal(brick: Brick, day: any){

        //var initialBrickTypeId = brick.brickType._id;

        var modalComponent: any = brick._id ? BrickModalComponent : BrickMultyModalComponent;
        
        var dialogRef = this.dialog.open(modalComponent, {
            width: '340px',
            //disableClose: true,  // use this feature for prevent closing window when we click on the backdrop
            //backdropClass: string // custom class for the backdrop (maybe for use this to show button in the circle)
            data: { 
                curBrick: brick,
                brickTypes: this.existentBrickTypes
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // status here mean Status of Action: 
            // ADD, UPDATE, DELETE
            if (result.status == 1) {
                result.bricksArray.forEach(curNewBrick => {
                    day.bricks.push(curNewBrick);
                    this.store.dispatch(new brickTypeAction.UpdateBrickTypeInStore(curNewBrick.brickType._id));
                });                
            } else if (result.status == 3) {
                for (let i = 0; i < day.bricks.length; i++) {
                    if (day.bricks[i]._id === result._id) {
                        day.bricks.splice(i, 1);
                        this.store.dispatch(new brickTypeAction.UpdateBrickTypeInStore(result.brickType));
                    }
                }
            } else if (result.status = 2) {
                this.store.dispatch(new brickTypeAction.UpdateBrickTypeInStore(brick.brickType._id));
                for (let i = 0; i < day.bricks.length; i++) {
                    if (day.bricks[i]._id === result._id) {
                        day.bricks[i] = result;
                        this.store.dispatch(new brickTypeAction.UpdateBrickTypeInStore(result.brickType._id));
                    }
                }
            }
        });
    }

    filterByHabbit(habbitsList){
        this.filteredHabbits = habbitsList;
        this.getBricksAndShowInMonth();
    }

    filterByCategory(categoryList){
        this.filteredCategories = categoryList;
        this.getBricksAndShowInMonth();
    }

    getDayTooltip(curday){
        if (!curday.bricks || curday.bricks.length == 0){
            return "No Data";
        }
        var summary = '';
        _.forEach(curday.bricks, (brick: any)=> {
            summary = summary + '<b>' + brick.brickType.name + '</b>' 
                + (brick.description ?  (" - <span class='margin-left-20'>" + brick.description + "</span>") : '') + "<br>";
        });
        return summary;
    }

    nextMonth(){
        // wee need this hack with date
        // becase we actually mutate the object, not Update it
        var currentDateTime = new Date(this.curDate);
        currentDateTime.setMonth( this.curDate.getMonth() + 1);
        this.curDate = currentDateTime;
        
        console.log("CUR DATE =", this.curDate);
        this.getBricksAndShowInMonth();
    }

    prevMonth(){
        var currentDateTime = new Date(this.curDate);
        currentDateTime.setMonth( this.curDate.getMonth() - 1);

        this.curDate = currentDateTime;
        console.log("CUR DATE =", this.curDate);
        this.getBricksAndShowInMonth();
    }

    todayMonth(){
        var currentDateTime = new Date();
        currentDateTime.setMonth((new Date()).getMonth());

        this.curDate = currentDateTime
        console.log("CUR DATE =", this.curDate);
        this.getBricksAndShowInMonth();
    }

    toogleSideBar(value){
        this.sideBarExpanded = value;

        this.authService.CurrentUser.helper.wallSideNavShow = this.sideBarExpanded;
        this.authService.updateCurrentUserInStorage();
        this.userService.updateUserHelper(this.authService.CurrentUser)
            .subscribe(res => console.log("User helper is updated"));
    }
}
