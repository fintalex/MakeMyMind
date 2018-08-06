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

// ============================== Services  =============================
import { CategoryService } from './category/category.service';
import { RegistrationService } from './registration/registration.service';
import { BrickTypeService } from './brickType/brickType.service';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { BrickService } from './brick/brick.service';
import { UserService } from './services/user.service';
import { FrendService } from './frend/frend.service';
import { DialogService } from './components/dialogs/dialog.service';

// ========================== Component ==============================
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { WallComponent } from './wall/wall.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryCenterComponent } from './category/category-center/category-center.component';
import { TestComponent } from './test/test.component';
import { BrickTypeCenterComponent } from './brickType/brick-type-center/brick-type-center.component';
import { BrickTypeDetailsComponent } from './brickType/brick-type-details/brick-type-details.component';
import { BrickTypeListComponent } from './brickType/brick-type-list/brick-type-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrickModalComponent } from './brick/brick-modal/brick-modal.component';
import { LocaleChangeComponent } from './components/locale-change/locale-change.component';
import { LogingComponent } from './components/loging/loging.component';
import { HeaderComponent } from './components/header/header.component';
import { WallSideNavComponent } from './components/wall-side-nav/wall-side-nav.component';
import { FrendComponent } from './frend/frend/frend.component';
import { FrendSearchComponent } from './frend/frend-search/frend-search.component';
import { FrendListComponent } from './frend/frend-list/frend-list.component';
import { ConfirmationModalComponent } from './components/dialogs/confirmation/confirmation.component';

// =============== App Pipes ====================
import { DateRu } from './pipes/dateru.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        AuthComponent,
        WallComponent,
        CategoryListComponent, CategoryDetailsComponent, CategoryCenterComponent, TestComponent, BrickTypeCenterComponent, BrickTypeDetailsComponent, BrickTypeListComponent, CalendarComponent, BrickModalComponent, ConfirmationModalComponent,

        // === pipes ====
        DateRu, CapitalizePipe, HomeComponent, LocaleChangeComponent, LogingComponent, HeaderComponent, WallSideNavComponent, FrendComponent, FrendSearchComponent, FrendListComponent
    ],
    entryComponents: [BrickModalComponent, ConfirmationModalComponent],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule, ReactiveFormsModule,
        SharedModule
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
