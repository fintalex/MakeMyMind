import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { GuardService } from './services/guard.service';

import { CategoryCenterComponent } from './category/category-center/category-center.component';
import { TestComponent } from './test/test.component';
import { BrickTypeCenterComponent } from './brickType/brick-type-center/brick-type-center.component';
import { FrendComponent } from './frend/frend/frend.component';
import { BrickTypeCardsCentreComponent } from './brickTypeCards/brick-type-cards-centre/brick-type-cards-centre.component';
import { GuardService } from '../services/guard.service';

const routes: Routes = [
    { 
        path: '',
        // component: WHICH componenet should be here?
        children: [
            { path: 'test', component: TestComponent },
            { path: 'category', component: CategoryCenterComponent, canActivate: [GuardService] },
            { path: 'brickType', component: BrickTypeCenterComponent, canActivate: [GuardService] },
            { path: 'brickTypeCards', component:  BrickTypeCardsCentreComponent, canActivate: [GuardService] },
            { path: 'frends', component: FrendComponent, canActivate: [GuardService] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserSettingRoutingModule { }
