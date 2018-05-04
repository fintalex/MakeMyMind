import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { CategoryService } from './category/category.service';
import { RegistrationService } from './registration/registration.service';
import { BrickTypeService } from './brickType/brickType.service';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { BrickService } from './brick/brick.service';

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
import { DatePipe } from '@angular/common';

// =============== App Pipes ====================
import { DateRu } from './pipes/dateru.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        AuthComponent,
        WallComponent,
        CategoryListComponent, CategoryDetailsComponent, CategoryCenterComponent, TestComponent, BrickTypeCenterComponent, BrickTypeDetailsComponent, BrickTypeListComponent, CalendarComponent, BrickModalComponent,

        // === pipes ====
        DateRu, CapitalizePipe, HomeComponent
    ],
    entryComponents: [BrickModalComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        SharedModule
    ],
    providers: [
        RegistrationService,
        CategoryService,
        BrickTypeService,
        BrickService,
        GuardService,
        AuthService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
