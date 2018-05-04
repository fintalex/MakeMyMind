import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrickModalComponent } from '../brick/brick-modal/brick-modal.component';
import { BrickTypeService } from '../brickType/brickType.service';
import { BrickType } from '../models/brick-type.model';
import { BrickService } from '../brick/brick.service';
import { Brick } from '../models/brick.model';
import * as _ from 'underscore';


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

    testTooltip: "here will be two rows";

    constructor(
        private dialog: MatDialog,
        private brickTypeService: BrickTypeService, 
        private brickService: BrickService
    ) {}

    ngOnInit() {        

        this.brickTypeService.getBrickTypes()
            .subscribe(allBrickTypes => {
                this.existentBrickTypes = allBrickTypes
            });
            
        this.getBricksAndShowInMonth();
    }

    getBricksAndShowInMonth(){
        this.brickService.getBricksForMonth(this.curDate)
            .subscribe(allBricksInMonth => {
                this.brickInMonth = allBricksInMonth;

                this.getMonthData(allBricksInMonth);
            });
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

        var dialogRef = this.dialog.open(BrickModalComponent, {
            width: '340px',
            data: { 
                curBrick: brick,
                brickTypes: this.existentBrickTypes
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.status == 1) {
                day.bricks.push(result);
            } else if (result.status == 3) {
                for (let i = 0; i < day.bricks.length; i++) {
                    if (day.bricks[i]._id === result._id) {
                        day.bricks.splice(i, 1);
                    }
                }
            } else if (result.status = 2) {
                for (let i = 0; i < day.bricks.length; i++) {
                    if (day.bricks[i]._id === result._id) {
                        day.bricks[i] = result;;
                    }
                }
            }
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
                'disabled': false,
                'today': newDay.getTime() === dayToday.getTime(),
                'day': newDay.getDate(),
                'bricks': bricksForThisDay
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

    getDayTooltip(curday){
        if (!curday.bricks || curday.bricks.length == 0){
            return "No Data";
        }
        var summary = '';
        _.forEach(curday.bricks, (brick: any)=> {
            summary = summary + brick.brickType.sign + (brick.description ?  " - " + brick.description : '') + "<br>";
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
}
