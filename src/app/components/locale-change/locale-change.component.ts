import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'locale-change',
    templateUrl: './locale-change.component.html',
    styleUrls: ['./locale-change.component.scss']
})
export class LocaleChangeComponent implements OnInit {

    

    constructor(
        private authService: AuthService,
        private translate: TranslateService,
        private userService: UserService) {
        var loc = this.authService.CurrentUser ? this.authService.CurrentUser.locale : this.authService.curLocale;
        translate.setDefaultLang(loc);
        translate.use(loc);
        this.authService.curLocale = loc;
    }

    swithcLanguage(language) {
        this.translate.use(language);
        
        if(this.authService.CurrentUser){
            this.authService.CurrentUser.locale = language;
            this.authService.curLocale = language;
            this.userService.updateUserLocale(this.authService.CurrentUser)
                .subscribe((res) => {
                    console.log("Locale changed to - " + res.locale);
                    this.authService.updateCurrentUserInStorage();
                });
        } else {
            this.authService.curLocale = language;
        }
    }


    ngOnInit() {
    }

}
