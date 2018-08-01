import { Component, OnInit, EventEmitter } from '@angular/core';
import { Frend } from '../../models/frend.model';

@Component({
    selector: 'frend-list',
    templateUrl: './frend-list.component.html',
    styleUrls: ['./frend-list.component.scss'],
    inputs: ['frendList'],
    outputs: ['deleteFrendEvent']
})
export class FrendListComponent implements OnInit {

    private deleteFrendEvent = new EventEmitter();

    frendList: Frend[];

    constructor() { }

    ngOnInit() {
    }

    deleteFrend(frend: Frend){
        // TODO : реализовать подтверждение
        this.deleteFrendEvent.emit(frend._id);
    }
}
