import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) { }

    register(user){
        //no need to use map and res.json in this case
        return this.http.post<any>('/api/users', user);
    }
}
