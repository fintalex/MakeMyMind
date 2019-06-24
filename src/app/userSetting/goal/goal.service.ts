import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../../models/goal.model';
import { Observable, observable } from 'rxjs';
import { GoalStatus } from 'app/models/enums/goals-status';

// New feature in ANGULAR 6
// {providedIn: 'root'}  parameter means that we don't need to specify it in Providers in app.module.
@Injectable({
    providedIn: 'root'
})
export class GoalService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getMyGoals(status: GoalStatus): Observable<any>{
        if (!this.authService.CurrentUser){
            return;
        }
        return this.http.get<any>(`/api/goals/getGoalsByUserAndStatus/${this.authService.CurrentUser._id}/${status}`);
    }

    getGoalById(goalId){
        if (!this.authService.CurrentUser){
            return;
        }
        return this.http.get<any>('/api/goals/getGoalById/' + goalId);
    }

    createGoal(goal: Goal){
        return this.http.post<any>('/api/goals', goal);
    }

    updateGoal(goal: Goal){
        return this.http.put<any>('/api/goals', goal);
    }

    deleteGoal(id){
        return this.http.delete<any>('/api/goals/' + id);
    }
}
