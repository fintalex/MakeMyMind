import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../category.service';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalParams } from '../../../models/modal-params.model';
import { MatDialog } from '@angular/material';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'category-center',
    templateUrl: './category-center.component.html',
    styleUrls: ['./category-center.component.scss']
})
export class CategoryCenterComponent implements OnInit {

    existentCategories: Category[];

    selectedCategory: Category;

    defaultCategies: Category[];
    translations: any;

    constructor(
        private categoryService: CategoryService,
        private authService: AuthService,
        private translateService: TranslateService,
        private dialog: MatDialog,
        private modalDialogs: DialogService,
        private userService: UserService
    ) { }

    ngOnInit() {
        if (!this.authService.CurrentUser.helper.categoryMainHelp){
            var bottomSheetParams: ModalParams = {
                disableClose: true, 
                okButtonTitle: "Понял", 
                cancelButtonTitle: "Пропустить",
                message: `Определи свои <b class="chocolate">сферы влияения</b>, свои жизненные основные ценности. Под которыми затем, Вы сможете 
                    создавать привычки, ставить цели, записывать мысли.
                    Мы создали для Вас <b class="chocolate">четыре основные сферы</b> в качестве примера. А также вы можете добавить любую сферу
                    из предложенных или же создать собственную.
                    `
            };

            this.modalDialogs.showBottomSheet(bottomSheetParams)
                .subscribe((res)=>{
                    // here we must save or dismiss Understanding
                    this.authService.CurrentUser.helper.categoryMainHelp = res;
                    this.authService.updateCurrentUserInStorage();
                    this.userService.updateUserHelper(this.authService.CurrentUser)
                        .subscribe(res => console.log("User helper is updated"));
                });
        }

        this.categoryService.getCategories()
            .subscribe((allCategories: any) => {
                this.existentCategories = allCategories
            });

        this.translateService.getTranslation(this.authService.curLocale)
            .subscribe((res) => {
                this.translations = res;

                this.defaultCategies = [
                    { name: this.translations.FamalyScopeName, color: "#ebbe2a", description: this.translations.FamalyScopeDescription},
                    { name: this.translations.HealthScopeName, color: "#1cdafc", description: this.translations.HealthScopeDescription},
                    { name: this.translations.HobbyScopeName, color: "#26ffbe", description: this.translations.HobbyScopeDescription},
                    { name: this.translations.SportScopeName, color: "#8257f8", description: this.translations.SportScopeDescription},
                    { name: this.translations.FrendsScopeName, color: "#5cff33", description: this.translations.FrendsScopeDescription},
                    { name: this.translations.BusinessScopeName, color: "#ff35f5", description: this.translations.BusinessScopeDescription},
                    { name: this.translations.LearningScopeName, color: "#ff3d3d", description: this.translations.LearningScopeDescription},
                    { name: this.translations.RelaxScopeName, color: "#a0a12f", description: this.translations.RelaxScopeDescription},
                ];
            });
    }

    onCreateCategory(category: Category) {
        category.user = this.authService.CurrentUser._id;
        this.categoryService.createCategory(category)
            .subscribe((newCategory: any) => {
                this.existentCategories.push(newCategory);
            });
    }

    onUpdateCategory(category: Category) {
        this.categoryService.updateCategory(category)
            .subscribe(updatedCategory => {
                //this.selectedCategory = updatedCategory;
            })
    }

    onDeleteCategory(id) {
        var deletedId = id;
        var allCategories = this.existentCategories;
        this.categoryService.deleteCategory(id)
            .subscribe(deletedCategory => {
                for (let i = 0; i < allCategories.length; i++) {
                    if (allCategories[i]._id === deletedId) {
                        allCategories.splice(i, 1);
                    }
                }
            });
        this.selectedCategory = null;
    }

    onSelectCategory(category: Category) {
        this.selectedCategory = category;
    }

}
