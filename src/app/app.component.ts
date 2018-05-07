import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private translate: TranslateService
    ) {
        translate.setDefaultLang('en');
        //translate.use('en');

        console.log(this.translate.instant('Wall'));
    }

    swithcLanguage(language) {
        this.translate.use(language);
    }

    logout() {

        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
