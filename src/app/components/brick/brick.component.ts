import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'brick',
    templateUrl: './brick.component.html',
    styleUrls: ['./brick.component.scss'],
    inputs: ['color', 'type', 'isIcon', 'sign']
})
export class BrickComponent implements OnInit {

    color: string;
    type: number = 1;
    sign: string;
    isIcon: boolean;

    constructor() { }

    ngOnInit() {
    }

}
