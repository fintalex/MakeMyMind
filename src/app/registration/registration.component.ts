import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { checkEmailExist } from '../validators/emailExist.validator';
import { Category } from '../models/category.model';
import { CategoryService } from '../category/category.service';
import { BrickTypeService } from '../brickType/brickType.service';
import { BrickType } from '../models/brick-type.model';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    public warningMessage: "";

    public regForm: FormGroup = new FormGroup({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        nickname: new FormControl(null, [Validators.required]),
        locale: new FormControl()
    });

    constructor(
        private registrationService: RegistrationService,
        private categoryService: CategoryService,
        private bricktypeService: BrickTypeService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() { }

    public reg() {


        this.regForm.value.locale = this.authService.curLocale; 

        this.registrationService.register(this.regForm.value).subscribe((res) => {
            if(res.success){

                // here need to create Category and Habit by Default
                this.createCategoryAndBrickTypeByDefault(res.user._id);

                this.router.navigate(['/auth']);

            } else {
                this.warningMessage = res.msg;
            }
        });
    }

    createCategoryAndBrickTypeByDefault(userid: string) {

        var categoryArray: Array<Category> = 
        [
            new Category({
                 name: 'Семья', color: '#ebbe2a', description: 'Семья', updated: new Date(), user: userid
            }),
            new Category({ 
                name: 'Здоровье', color: '#1cdafc', description: 'Здоровье', updated: new Date(), user: userid, 
                brickType: new BrickType({name: 'Правильное питание', sign: 'ПП', ruleDescription: 'Соблюдение всех правил правильного питания в течении дня', createdDate: new Date, isRemoved: false, user: userid, isPrivate: true, isIcon: false})
            }),
            new Category({ 
                name: 'Саморазвитие', color: '#ff0000', description: 'Саморазвитие', updated: new Date(), user: userid,
                brickType: new BrickType({name: 'Чтение', sign: 'chrome_reader_mode', ruleDescription: 'Чтение 20 мин', createdDate: new Date, isRemoved: false, user: userid, isPrivate: true, isIcon: true})
            }),
            new Category({ 
                name: 'Спорт', color: '#8257f8', description: 'Спорт', updated: new Date(), user: userid,
                brickType: new BrickType({name: 'Утренняя зарядка', sign: 'directions_run', ruleDescription: 'Зарядка с утра 15 мин', createdDate: new Date, isRemoved: false, user: userid, isPrivate: true, isIcon: true})
            })
        ];

        categoryArray.forEach(catByDefault => {
            this.categoryService.createCategory(catByDefault)
                .subscribe(newCat => {
                    if(catByDefault.brickType){
                        catByDefault.brickType.category = newCat._id;
                        this.bricktypeService.createBrickType(catByDefault.brickType)
                            .subscribe(newBrickType => {
                                console.log("Category and Habbit created");
                            }); 
                    }
                });
        });

        
    }
}
