import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../goal.service';
import { Goal } from '../../../models/goal.model';
import { Observable, from } from 'rxjs';
import { filter, tap, concatMap, map } from 'rxjs/operators';
import * as _ from 'underscore';
import { GoalStatus } from 'app/models/enums/goals-status';


@Component({
    selector: 'app-goal-center',
    templateUrl: './goal-center.component.html',
    styleUrls: ['./goal-center.component.scss']
})
export class GoalCenterComponent implements OnInit {

    goals$: Observable<Goal[]>;
    goalsDeleted$: Observable<Goal[]>;
    goalsFinished$: Observable<Goal[]>;
    goalsFailed$: Observable<Goal[]>;

    goalsCount$: Observable<string>;
    goalsDeletedCount$: Observable<string>;
    goalsFinishedCount$: Observable<string>;
    goalsFailedCount$: Observable<string>;

    deletedLoaded: boolean = false;
    finishedLoaded: boolean = false;
    failedLoaded: boolean = false;

    constructor(
        private router: Router,
        private goalService: GoalService
    ) { }
    
    ngOnInit() {
        this.goals$ = this.goalService.getMyGoals(GoalStatus.Active);
        this.goalsDeleted$ = this.goalService.getMyGoals(GoalStatus.Deleted);
        this.goalsFinished$ = this.goalService.getMyGoals(GoalStatus.Finished);
        this.goalsFailed$ = this.goalService.getMyGoals(GoalStatus.Failed);

        // Why do i need string here instead of number???
        // because if there is 0 goals count, we will get FALSE in async 
        // and there will be eternal spiner
        this.goalsCount$ = this.goalService.getMyGoalsCount(GoalStatus.Active).pipe(map(count => count.toString()));
        this.goalsDeletedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Deleted).pipe(map(count => count.toString()));
        this.goalsFinishedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Finished).pipe(map(count => count.toString()));
        this.goalsFailedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Failed).pipe(map(count => count.toString()));
    }

    goToGoalDetails(id){
        this.router.navigate([`/goals/${id}`]);
    }

    // showGoalsByStatus(curGoals: Observable<Goal[]>, status: number){
    //     return curGoals.pipe(
    //         filter((goal: any) => {
    //             return goal.status == status;   
    //         })
    //     );
    // }
    
}
