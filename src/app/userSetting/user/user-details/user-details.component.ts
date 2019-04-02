import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    user$: Observable<User>;

    constructor(private userService: UserService, private authSvc: AuthService) { }

    ngOnInit() {
        this.user$ = this.userService.getUserById(this.authSvc.CurrentUser._id);
    }

    updateUser() {
        let user = new User();

        this.userService.updateUser(user)
            .subscribe(res => console.log(res));
    }
}
