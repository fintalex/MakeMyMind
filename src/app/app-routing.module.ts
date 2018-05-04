import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { CategoryCenterComponent } from './category/category-center/category-center.component';
import { TestComponent } from './test/test.component';
import { BrickTypeCenterComponent } from './brickType/brick-type-center/brick-type-center.component';
import { GuardService } from './services/guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'test', component: TestComponent },
    { path: 'home', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'category', component: CategoryCenterComponent, canActivate: [GuardService] },
    { path: 'brickType', component: BrickTypeCenterComponent, canActivate: [GuardService] },
    { path: 'wall', component: WallComponent, canActivate: [GuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}