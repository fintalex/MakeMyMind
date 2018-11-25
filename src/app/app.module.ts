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

// =============== App Pipes ====================
import { DateRu } from './pipes/dateru.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { BottomSheetComponent } from './components/dialogs/bottom-sheet/bottom-sheet.component';

import { StoreModule } from '@ngrx/store';
// import * as fromStore from './store/index';
import { effects, reducers, } from './store/index';
//import { reducers, metaReducers } from './store/reducers';

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
        BottomSheetComponent, BrickMultyModalComponent,

        // === pipes ====
        DateRu, CapitalizePipe
    ],
    entryComponents: [BrickModalComponent, BrickMultyModalComponent, ConfirmationModalComponent, BottomSheetComponent,
        //BrickTypeModalComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,        
        BrowserAnimationsModule,       
        FormsModule, ReactiveFormsModule,
        SharedModule, 
        
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),

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
