import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { checkEmailExist } from '../validators/emailExist.validator';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    public warningMessage: "";

    public regForm: FormGroup = new FormGroup({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        nickname: new FormControl(null, [Validators.required]),
        locale: new FormControl()
    });

    constructor(
        private registrationService: RegistrationService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() { }

    public reg() {
        debugger;
        this.regForm.value.locale = this.authService.curLocale;
        this.registrationService.register(this.regForm.value).subscribe((res) => {
            console.log("SUCCESSFULY REGISTERED", res);
            if(res.success){
                this.router.navigate(['/auth']);
            } else {
                this.warningMessage = res.msg;
            }
        });
    }
}
