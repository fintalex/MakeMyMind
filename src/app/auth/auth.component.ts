import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromBrickTypeSelectors from '../store/selectors/brickType.selectors';
import * as brickTypeAction from '../store/actions/brickTypes';
import * as categoryAction from '../store/actions/categories';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    private user: User;
    public warningMessage: "";

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });
    //public nameControl: FormControl = new FormControl();

    constructor(
        private authService: AuthService, 
        private router: Router,
        private store: Store<fromBrickTypeSelectors.State>) { }

    ngOnInit(
    ) { 
        console.log("AHY");
        console.log(0.1 + 0.2);        
    }

    public login() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {

            console.log(res.msg);

            /// perhaps here we need to load Category and habbits to NG-RX container

            if (res.user && res.success) {
                this.store.dispatch(new brickTypeAction.LoadBrickTypes());
                this.store.dispatch(new categoryAction.LoadCategories());
                this.router.navigate(['/wall']);
            } else {
                this.warningMessage = res.msg;
            }

        });
    }

}
