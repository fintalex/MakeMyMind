import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { Category } from '../../models/category.model';
import { DialogService } from '../../components/dialogs/dialog.service';
import { ModalParams } from '../../models/modal-params.model';

@Component({
    selector: 'category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss'],
    outputs: [
        'createCategoryEvent',
        'deleteCategoryEvent',
        'updateCategoryEvent'
    ],
    inputs: ['category'],
})
export class CategoryDetailsComponent implements OnInit {

    category: Category;
    private createCategoryEvent = new EventEmitter();
    private deleteCategoryEvent = new EventEmitter();
    private updateCategoryEvent = new EventEmitter();

    public categoryDetailsForm: FormGroup = new FormGroup({
        name: new FormControl(),
        color: new FormControl(),
        description: new FormControl()
    });

    constructor(private dialogs: DialogService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        console.log("I am In ngOnCahanges");
        if (this.category) {
            this.categoryDetailsForm = new FormGroup({
                name: new FormControl(this.category.name),
                color: new FormControl(this.category.color),
                description: new FormControl(this.category.description)
            });
        }
    }

    public createCategory() {
        this.createCategoryEvent.emit(this.categoryDetailsForm.value);
        this.category = null;
        this.categoryDetailsForm.reset();
    }

    public deleteCategory() {

        var params: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите удалить категорию - ' + this.category.name + '?'
        }

        this.dialogs.showConfirm(params)
            .subscribe(result => {
                if (result){
                    this.deleteCategoryEvent.emit(this.category._id);
                    this.category = null;
                    this.categoryDetailsForm.reset();
                }
            })
    }

    public updateCategory() {
        this.category.name = this.categoryDetailsForm.value.name;
        this.category.color = this.categoryDetailsForm.value.color;
        this.category.description = this.categoryDetailsForm.value.description;
        this.updateCategoryEvent.emit(this.category);
    }
}
