import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

    // "styles": [
    //     "node_modules/primeicons/primeicons.css",
    //     "node_modules/primeng/resources/themes/cruze/theme.css",
    //     "node_modules/primeng/resources/primeng.min.css",
    //     //...
    //   ],
})
export class AppComponent {

    constructor(
        public authService: AuthService,
        public router: Router
        //private translate: TranslateService,
        //private userService: UserService
    ) {
        //translate.setDefaultLang(this.authService.CurrentUser ? this.authService.CurrentUser.locale : 'en');
        //translate.use('en');translate.setDefaultLang(this.authService.CurrentUser ? this.authService.CurrentUser.locale : 'en');
        //translate.use('en');

        //console.log(this.translate.instant('Wall'));
    }
}
