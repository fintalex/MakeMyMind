import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../goal.service';
import { Goal } from '../../../models/goal.model';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-goal-center',
    templateUrl: './goal-center.component.html',
    styleUrls: ['./goal-center.component.scss']
})
export class GoalCenterComponent implements OnInit {

    goals: Observable<Goal[]>;

    constructor(
        private router: Router,
        private goalService: GoalService
    ) { }
    
    ngOnInit() {
        this.goals = this.goalService.getGoals();
            // .subscribe(usersGoals => {
            //     this.goals = usersGoals;
            // });
    }

    goToGoalDetails(id){
        this.router.navigate([`/goals/${id}`]);
    }
}
