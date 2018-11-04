import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingRoutingModule } from './user-setting-routing.module';

import { BrickTypeCardsCentreComponent } from './brickTypeCards/brick-type-cards-centre/brick-type-cards-centre.component';
import { BrickTypeModalComponent } from './brickTypeCards/brick-type-modal/brick-type-modal.component';
import { FrendComponent } from './frend/frend/frend.component';
import { FrendSearchComponent } from './frend/frend-search/frend-search.component';
import { FrendListComponent } from './frend/frend-list/frend-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryCenterComponent } from './category/category-center/category-center.component';
import { TestComponent } from './test/test.component';
import { BrickTypeCenterComponent } from './brickType/brick-type-center/brick-type-center.component';
import { BrickTypeDetailsComponent } from './brickType/brick-type-details/brick-type-details.component';
import { BrickTypeListComponent } from './brickType/brick-type-list/brick-type-list.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesListComponent } from './categoryNew/categories-list/categories-list.component';
import { CategoryItemComponent } from './categoryNew/category-item/category-item.component';
import { CategorySelectedComponent } from './categoryNew/category-selected/category-selected.component';
import { CategoryContainerComponent } from './categoryNew/category-container/category-container.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        UserSettingRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        FormsModule, ReactiveFormsModule,
        SharedModule
    ],  
    declarations: [
        CategoryListComponent, CategoryDetailsComponent, CategoryCenterComponent, TestComponent, 
        BrickTypeCenterComponent, BrickTypeDetailsComponent, BrickTypeListComponent, 
        FrendComponent, FrendSearchComponent, FrendListComponent, 
        BrickTypeCardsCentreComponent, BrickTypeModalComponent, 
        CategoriesListComponent, 
        CategoryItemComponent, 
        CategorySelectedComponent, 
        CategoryContainerComponent,
    ],
    entryComponents: [
        BrickTypeModalComponent
    ],
})
export class UserSettingModule { }
