import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { GuardService } from './services/guard.service';
import { HomeComponent } from './home/home.component';
//import { CategoryContainerComponent } from './userSetting/categoryNew/category-container/category-container.component';
import { UserSettingModule } from './userSetting/user-setting.module';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'wall/:nick', component: WallComponent, canActivate: [GuardService] },
    /////{ path: 'wall',  component: WallComponent, canActivate: [GuardService] },
    { path: 'wall', redirectTo: 'wall/'}, // just only this ROUT will help me to NOT UPDATE the page when we got from Wall to Wall with parameters.

    //// LAZY LOADIN for part UsertSetting (https://www.youtube.com/watch?v=WQZq07ecohk)
    
    // LoadChildren always throw an error "Can not find module" after updating to Angular 7 on 1.11.2018
    // { path: 'userSetting', loadChildren: './userSetting/user-setting.module#UserSettingModule'},
    // I think i need to move in this way (work only with next)
    { path: 'userSetting', loadChildren: () => UserSettingModule},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}