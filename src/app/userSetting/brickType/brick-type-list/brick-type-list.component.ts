import { Component, OnInit, EventEmitter } from '@angular/core';
import { BrickType } from '../../../models/brick-type.model';

@Component({
    selector: 'brick-type-list',
    templateUrl: './brick-type-list.component.html',
    styleUrls: ['./brick-type-list.component.scss'],
    inputs: ['brickTypes'],
    outputs: ['selectBrickTypeEvent']
})
export class BrickTypeListComponent implements OnInit {

    brickTypes: BrickType[];

    private selectBrickTypeEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    public selectBrickType(selectedBrickType: BrickType) {
        this.selectBrickTypeEvent.emit(selectedBrickType);
    }
}
