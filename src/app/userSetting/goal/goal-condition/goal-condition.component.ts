import { Component, OnInit } from '@angular/core';
import { Condition } from '../../../models/condition';

@Component({
    selector: 'goal-condition',
    templateUrl: './goal-condition.component.html',
    styleUrls: ['./goal-condition.component.scss'],
    inputs: ['condition']
})
export class GoalConditionComponent implements OnInit {

    condition: Condition;

    conditionSteps: any[] = [];
    
    constructor() { }

    ngOnInit() {
        //console.log(" GoalConditionComponent. Condidtion is : ", this.condition);
        for(let i = 1; i<= this.condition.neededCount; i++){
            var step = {
                index: i,
                color: i <= this.condition.markedCount ?  this.condition.brickType.category.color : "gray"
            };
            this.conditionSteps.push(step);
        }
    }

}
