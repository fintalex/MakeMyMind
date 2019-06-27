import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../goal.service';
import { Goal } from '../../../models/goal.model';
import { Observable, from } from 'rxjs';
import { filter, tap, concatMap } from 'rxjs/operators';
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

    goalsCount$: Observable<number>;
    goalsDeletedCount$: Observable<number>;
    goalsFinishedCount$: Observable<number>;
    goalsFailedCount$: Observable<number>;

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

        this.goalsCount$ = this.goalService.getMyGoalsCount(GoalStatus.Active);
        this.goalsDeletedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Deleted);
        this.goalsFinishedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Finished);
        this.goalsFailedCount$ = this.goalService.getMyGoalsCount(GoalStatus.Failed);
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
