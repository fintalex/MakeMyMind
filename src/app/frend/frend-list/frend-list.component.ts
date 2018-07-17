import { Component, OnInit } from '@angular/core';
import { Frend } from '../../models/frend.model';

@Component({
    selector: 'frend-list',
    templateUrl: './frend-list.component.html',
    styleUrls: ['./frend-list.component.scss'],
    inputs: ['frendList']
})
export class FrendListComponent implements OnInit {

    frendList: Frend[];

    constructor() { }

    ngOnInit() {
    }

}
