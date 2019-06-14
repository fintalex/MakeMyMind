import { Component, OnInit, EventEmitter } from '@angular/core';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
  inputs: ['goal', 'editable'],
  outputs: ['removeConditionEvent']
})
export class GoalCardComponent implements OnInit {

    goal: Goal;
    editable: boolean = false;

    //private goToCardEvent = new EventEmitter();
    private removeConditionEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log(this.goal);
    }

    // goToCard(id) {
    //     this.goToCardEvent.emit(id);
    // }

    removeCondition(id){
        this.removeConditionEvent.emit(id);
    }
}
