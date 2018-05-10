import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private translate: TranslateService,
        private userService: UserService
    ) {
        translate.setDefaultLang(this.authService.CurrentUser.locale);
        //translate.use('en');

        console.log(this.translate.instant('Wall'));
    }

    swithcLanguage(language) {
        this.translate.use(language);
        this.authService.CurrentUser.locale = language;
        this.userService.updateUserLocale(this.authService.CurrentUser) 
            .subscribe((res) => {
                console.log("Locale changed to - " + res.locale);
                this.authService.updateCurrentUserInStorage();
            });
    }

    logout() {

        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
