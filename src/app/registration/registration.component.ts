import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public regForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    nickname: new FormControl()
  });

  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {}

  public reg() {
    this.registrationService.register(this.regForm.value).subscribe((res) =>{
      console.log("SUCCESSFULY REGISTERED", res);
      this.router.navigate(['/auth']);
    });
  }
}
