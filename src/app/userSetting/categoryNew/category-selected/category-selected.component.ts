import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../../models/category.model';

@Component({
    selector: 'category-selected',
    templateUrl: './category-selected.component.html',
    styleUrls: ['./category-selected.component.scss']
})
export class CategorySelectedComponent implements OnInit {

    @Input() category = Category;

    constructor() { }

    ngOnInit() {
    }

}
