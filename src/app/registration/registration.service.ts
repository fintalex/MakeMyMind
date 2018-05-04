import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  constructor(private http: Http) { }

  register(user){
    return this.http.post('/api/users', user)
      .map((res: Response) => res.json());
  }
}
