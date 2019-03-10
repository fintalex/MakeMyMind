import { Component, OnInit, EventEmitter } from '@angular/core';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
  inputs: ['goal'],
  outputs: ['goToCardEvent']
})
export class GoalCardComponent implements OnInit {

    goal: Goal;

    private goToCardEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log(this.goal);
    }

    goToCard(id) {
        this.goToCardEvent.emit(id);
    }

}
