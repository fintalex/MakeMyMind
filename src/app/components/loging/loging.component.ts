import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.scss']
})
export class LogingComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private router: Router) { 
        }

    ngOnInit() {
    }

    logout() {

        this.authService.logout();
        this.router.navigate(['/auth']);
    }

}
