import { Component, OnInit, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  inputs: ['categories'],
  outputs: ['selectCategoryEvent']
})
export class CategoryListComponent implements OnInit {

  private selectCategoryEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  public selectCategory(selectedCategory: Category) {
    this.selectCategoryEvent.emit(selectedCategory);
  }
}
