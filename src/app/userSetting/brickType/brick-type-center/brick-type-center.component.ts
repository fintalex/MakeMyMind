import { Component, OnInit } from '@angular/core';

import { BrickType } from '../../../models/brick-type.model';
import { Category } from '../../../models/category.model';

import { CategoryService } from '../../category/category.service';
import { BrickTypeService } from '../brickType.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'brick-type-center',
  templateUrl: './brick-type-center.component.html',
  styleUrls: ['./brick-type-center.component.scss']
})
export class BrickTypeCenterComponent implements OnInit {
  
    existentBrickTypes: BrickType[];

    existentCategories: Category[];

    selectedBrickType: BrickType;

    constructor(private brickTypeService: BrickTypeService, 
                private categoryService: CategoryService,
                private authService: AuthService) { }

    ngOnInit() {
        this.brickTypeService.getBrickTypes()
        .subscribe((allBrickTypes: any) => { 
            this.existentBrickTypes = allBrickTypes
        });
        this.categoryService.getCategories()
        .subscribe((allCategories: any) => { 
            this.existentCategories = allCategories
        });
    }

    onCreateBrickType(brickType: BrickType){
        brickType.user = this.authService.CurrentUser._id;
        this.brickTypeService.createBrickType(brickType)
        .subscribe((newBrickType: any) => {
            this.existentBrickTypes.push(newBrickType);
        });
    }

    onUpdateBrickType(brickType: BrickType){
        var allBrickTypes = this.existentBrickTypes;
        this.brickTypeService.updateBrickType(brickType)
            .subscribe((updatedBrickType: any) => {
                for(let i = 0; i < allBrickTypes.length; i++){
                if(allBrickTypes[i]._id === updatedBrickType._id){
                    allBrickTypes[i] = updatedBrickType;;
                }
                }
            })
    }

    onDeleteBrickType(id){
        var deletedId = id;
        var allBrickTypes = this.existentBrickTypes;
        this.brickTypeService.deleteBrickType(id)
        .subscribe(deletedBrickType => {
            for(let i = 0; i < allBrickTypes.length; i++){
            if(allBrickTypes[i]._id === deletedId){
                allBrickTypes.splice(i,1);
            }
            }
        });
        this.selectedBrickType = null;
    }

    onSelectBrickType(brickType: BrickType){
        this.selectedBrickType = brickType;
    }

}
