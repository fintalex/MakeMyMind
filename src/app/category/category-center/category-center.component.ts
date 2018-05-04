import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../category.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'category-center',
  templateUrl: './category-center.component.html',
  styleUrls: ['./category-center.component.scss']
})
export class CategoryCenterComponent implements OnInit {

  existentCategories: Category[];

  selectedCategory: Category;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(allCategories => { 
        this.existentCategories = allCategories
      });
  }

  onCreateCategory(category: Category){
    category.user = this.authService.CurrentUser._id;
    this.categoryService.createCategory(category)
      .subscribe(newCategory => {
        this.existentCategories.push(newCategory);
      });
  }

  onUpdateCategory(category: Category){
    this.categoryService.updateCategory(category)
      .subscribe(updatedCategory => {
        //this.selectedCategory = updatedCategory;
      })
  }

  onDeleteCategory(id){
    var deletedId = id;
    var allCategories = this.existentCategories;
    this.categoryService.deleteCategory(id)
      .subscribe(deletedCategory => {
        for(let i = 0; i < allCategories.length; i++){
          if(allCategories[i]._id === deletedId){
            allCategories.splice(i,1);
          }
        }
      });
    this.selectedCategory = null;
  }

  onSelectCategory(category: Category){
    this.selectedCategory = category;
  }

}
