import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SnackBarService } from 'app/components/snack-bar/snack-bar.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    helperOn: boolean;

    user$: Observable<User>;

    public userForm: FormGroup = new FormGroup({
        nickname: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required, Validators.email]),
        showHelpers: new FormControl()
    })

    constructor(
        private userService: UserService, 
        private authSvc: AuthService,
        private snackSvc: SnackBarService) { }

    ngOnInit() {
        // here must be ngrx calling
        this.user$ = this.userService.getUserById(this.authSvc.CurrentUser._id);
    }

    updateUser() {
        if (this.userForm.invalid){
            return;
        }
        // here must be ngrx calling
        this.authSvc.CurrentUser.nickname = this.userForm.value.nickname;
        this.authSvc.CurrentUser.username = this.userForm.value.username;    
        this.authSvc.CurrentUser.showHelpers = this.userForm.value.showHelpers;     

        this.saveUserInDB();  
    }

    saveUserInDB(){
        this.userService.updateUser(this.authSvc.CurrentUser)
            .subscribe(res => {
                this.snackSvc.showSuccess({data: {message: "Данные сохранены"}});
            });
    }

    activateHelpers() {
        for(var helperRpop in this.authSvc.CurrentUser.helper){
            this.authSvc.CurrentUser.helper[helperRpop] = true;
        }
        this.snackSvc.showSuccess({data: {message: "Все хелперы активированы"}});
        this.saveUserInDB();  
    }
}
