import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private user: User;
  private warningMessage: "";

  public loginForm: FormGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
  });
  public nameControl: FormControl = new FormControl();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  public login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((res) =>{
      
      console.log(res.msg);

      if(res.user && res.success){
        this.router.navigate(['/wall']);
      } else {
        this.warningMessage = res.msg;
      }
      
    });
  }

}
