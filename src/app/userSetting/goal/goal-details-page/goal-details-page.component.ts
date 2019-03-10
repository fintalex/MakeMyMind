import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem, SelectItemGroup, DialogService } from 'primeng/api';
import { BrickType } from '../../../models/brick-type.model';
import { DatePipe } from '@angular/common';
import * as _ from 'underscore';
import { Store, select } from '@ngrx/store';
import * as fromBrickTypeSelectors from '../../../store/selectors/brickType.selectors';
import { Observable } from 'rxjs';
import { GoalService } from '../goal.service';
import { AuthService } from '../../../services/auth.service';
import { Goal } from '../../../models/goal.model';
import { Condition } from '../../../models/condition';

@Component({
    selector: 'goal-details-page',
    templateUrl: './goal-details-page.component.html',
    styleUrls: ['./goal-details-page.component.scss']
})
export class GoalDetailsPageComponent implements OnInit {

    goalId: string;
    minDateValue: Date;
    ru: any;
    en: any;
    curGoal: Goal;
    //existentBrickTypes: BrickType[];
    //curDate: string;
    //brickTypes$: Observable<BrickType[]>;
    existedBrickTypes: SelectItem[];
    selectedBrickType: any = {}; // important to set DEF value
    curName: string;
    dateStart: Date;
    dateEnd: Date;
    conditionals: any[];

    public goalForm: FormGroup = new FormGroup({
        name: new FormControl(),
        startDate: new FormControl(),
        finishDate: new FormControl()
    });

    constructor(
        private goalService: GoalService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe,
        private store: Store<fromBrickTypeSelectors.State>
    ) { }

    ngOnInit() {

        this.conditionals = [];

        //this.brickTypes$ = this.store.pipe(select(fromBrickTypeSelectors.getBrickTypes));

        this.store.pipe(select(fromBrickTypeSelectors.getBrickTypes)).subscribe(brickTypes => {
            this.existedBrickTypes = brickTypes.map(brt=> { return {label: brt.name, value: brt }});

            this.goalId = this.route.snapshot.paramMap.get('id');

            if (this.goalId != '0'){
                this.goalService.getGoalById(this.goalId)
                    .subscribe((goal: Goal) => {
                        this.curGoal = goal;
    
                        this.curName = goal.name;
                        this.dateStart = new Date(goal.createdDate);
                        this.dateEnd = new Date(goal.finishDate);
    
                        this.conditionals = goal.conditions.map(g=> 
                            { 
                                var brt = _.find(brickTypes, (brType: any) => { return brType._id == g.brickType });
                                return { days: g.neededCount, brickType: brt };
                            });
    
                    });
            }
        });

        this.minDateValue = new Date();

        var nowDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

        //this.curDate = this.datePipe.transform(this.data.curBrick.date, 'dd.MM.yyyy');

        //this.existentBrickTypes = _.filter(this.data.brickTypes, (brickType: any) => brickType.status == 1 && (this.curDate != nowDate ? brickType.type == 1 : true));

      

        this.ru = {
            firstDayOfWeek: 0,
            dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            dayNamesShort: ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
            dayNamesMin: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
            monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
            monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yy'
        };

        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yy'
        };
    }

    createNewGoal() {
        console.log("selectedBrickType", this.selectedBrickType);

        if (this.curName && this.dateStart && this.dateEnd){

            var curGoal: Goal = {
                name: this.curName,
                status: 1,
                user: this.authService.CurrentUser._id,
                createdDate: this.dateStart,
                finishDate: this.dateEnd,
                conditions: this.conditionals.map(cond => { 
                    return  { 
                        brickType: cond.brickType._id, 
                        neededCount: cond.days }
                })
            };

            this.goalService.createGoal(curGoal)
                .subscribe(result => {
                    console.log(result);
                });

        } else {
            // show warnings
        }
    }

    addNewCondition(){
        this.conditionals.push({'brickType': '', 'days': 1});
    }

    goBack(){
        this.router.navigate(['/goals']);
    }

}
