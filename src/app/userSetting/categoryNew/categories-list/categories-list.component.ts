import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

    @Input() categories: Category[];
    @Output() select = new EventEmitter();

    constructor() { }

    ngOnInit() { 
        console.log("sdf");
    }

}
