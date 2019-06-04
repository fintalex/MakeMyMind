// ============================== MODULES =============================
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { EffectsModule } from '@ngrx/effects';
import { MatCarouselModule } from '@ngmodule/material-carousel'

// ============================== Services  =============================
import { CategoryService } from './userSetting/category/category.service';
import { BrickTypeService } from './userSetting//brickType/brickType.service';

import { RegistrationService } from './registration/registration.service';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { BrickService } from './brick/brick.service';
import { UserService } from './services/user.service';
import { FrendService } from './userSetting//frend/frend.service';
import { DialogService } from './components/dialogs/dialog.service';

// ========================== Component ==============================
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { WallComponent } from './wall/wall.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrickModalComponent } from './brick/brick-modal/brick-modal.component';
import { BrickMultyModalComponent } from './brick/brick-multy-modal/brick-multy-modal.component';
import { LocaleChangeComponent } from './components/locale-change/locale-change.component';
import { LogingComponent } from './components/loging/loging.component';
import { HeaderComponent } from './components/header/header.component';
import { WallSideNavComponent } from './components/wall-side-nav/wall-side-nav.component';
import { ConfirmationModalComponent } from './components/dialogs/confirmation/confirmation.component';
import { GoalConditionComponent } from './userSetting/goal/goal-condition/goal-condition.component';

// =============== App Pipes ====================
import { DateRu } from './pipes/dateru.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { BottomSheetComponent } from './components/dialogs/bottom-sheet/bottom-sheet.component';

import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import * as fromStore from './store/index';
import { effects, reducers, } from './store/index';
//import { reducers, metaReducers } from './store/reducers';


import { BrickTypeCardsCentreComponent } from './userSetting/brickTypeCards/brick-type-cards-centre/brick-type-cards-centre.component';
import { BrickTypeModalComponent } from './userSetting/brickTypeCards/brick-type-modal/brick-type-modal.component';
import { FrendComponent } from './userSetting/frend/frend/frend.component';
import { FrendSearchComponent } from './userSetting/frend/frend-search/frend-search.component';
import { FrendListComponent } from './userSetting/frend/frend-list/frend-list.component';
import { CategoryListComponent } from './userSetting/category/category-list/category-list.component';
import { CategoryDetailsComponent } from './userSetting/category/category-details/category-details.component';
import { CategoryCenterComponent } from './userSetting/category/category-center/category-center.component';
import { TestComponent } from './userSetting/test/test.component';
import { BrickTypeCenterComponent } from './userSetting/brickType/brick-type-center/brick-type-center.component';
import { BrickTypeDetailsComponent } from './userSetting/brickType/brick-type-details/brick-type-details.component';
import { BrickTypeListComponent } from './userSetting/brickType/brick-type-list/brick-type-list.component';
import { BrickTypePageComponent } from './userSetting/brickTypeCards/brick-type-page/brick-type-page.component';

import { CategoriesListComponent } from './userSetting/categoryNew/categories-list/categories-list.component';
import { CategoryItemComponent } from './userSetting/categoryNew/category-item/category-item.component';
import { CategorySelectedComponent } from './userSetting/categoryNew/category-selected/category-selected.component';
import { CategoryContainerComponent } from './userSetting/categoryNew/category-container/category-container.component';

import { GoalCenterComponent } from './userSetting/goal/goal-center/goal-center.component';
import { GoalDetailsPageComponent } from './userSetting/goal/goal-details-page/goal-details-page.component';
import { GoalCardComponent } from './userSetting/goal/goal-card/goal-card.component';


//import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BrickComponent } from './components/brick/brick.component';
import { UserDetailsComponent } from './userSetting/user/user-details/user-details.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        AuthComponent,
        WallComponent,

        // Relocate it to separate MODULE FOR LAZZY LOADIN (because peoples will often use only calendar)
        // CategoryListComponent, CategoryDetailsComponent, CategoryCenterComponent, TestComponent, 
        // BrickTypeCenterComponent, BrickTypeDetailsComponent, BrickTypeListComponent, 
        // FrendComponent, FrendSearchComponent, FrendListComponent, 
        // BrickTypeCardsCentreComponent, BrickTypeModalComponent,
        
        CalendarComponent, BrickModalComponent, ConfirmationModalComponent,
        HomeComponent, LocaleChangeComponent, LogingComponent, HeaderComponent, WallSideNavComponent, 
        BottomSheetComponent, BrickMultyModalComponent, GoalConditionComponent,

        GoalCenterComponent,GoalDetailsPageComponent,GoalCardComponent,

        CategoryListComponent, CategoryDetailsComponent, CategoryCenterComponent, TestComponent, 
        BrickTypeCenterComponent, BrickTypeDetailsComponent, BrickTypeListComponent, 
        FrendComponent, FrendSearchComponent, FrendListComponent, 
        BrickTypeCardsCentreComponent, BrickTypeModalComponent, BrickTypePageComponent,
        CategoriesListComponent, 
        CategoryItemComponent, 
        CategorySelectedComponent, 
        CategoryContainerComponent,

        // === pipes ====
        DateRu, CapitalizePipe, BrickComponent, UserDetailsComponent, UserInfoComponent
    ],
    entryComponents: [BrickModalComponent, BrickMultyModalComponent, ConfirmationModalComponent, BottomSheetComponent,
        BrickTypeModalComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,        
        BrowserAnimationsModule,       
        FormsModule, ReactiveFormsModule,
        SharedModule, 
        MatCarouselModule,
        
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        

        //TableModule,
        CarouselModule,OrderListModule,ButtonModule,PanelModule,AccordionModule,ColorPickerModule,CalendarModule,DropdownModule,InputTextModule,

        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        RegistrationService,
        CategoryService,
        BrickTypeService,
        BrickService,
        GuardService,
        AuthService,
        UserService,
        FrendService,
        DialogService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
