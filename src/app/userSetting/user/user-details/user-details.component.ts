import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    user$: Observable<User>;

    public userForm: FormGroup = new FormGroup({
        nickname: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required, Validators.email]), 
    })

    constructor(private userService: UserService, private authSvc: AuthService) { }

    ngOnInit() {
        // here must be ngrx calling
        this.user$ = this.userService.getUserById(this.authSvc.CurrentUser._id);
    }

    updateUser() {
        // here must be ngrx calling
        this.authSvc.CurrentUser.nickname = this.userForm.value.nickname;
        this.authSvc.CurrentUser.username = this.userForm.value.username;

        this.userService.updateUser(this.authSvc.CurrentUser)
            .subscribe(res => {
                console.log(res);
            });
    }
}
