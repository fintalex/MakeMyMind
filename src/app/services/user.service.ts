import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService{

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    updateUserLocale(user: User) {
        return this.http.post<any>('/api/users/updatelocale', user);
    }

    updateUserHelper(user: User) {
        return this.http.post<any>('/api/users/updatehelper', user);
    }

    getUserDDL(val: String) {
        return this.http.post<any>('/api/users/getusersddl', { str: val});
    }

    getUserById(id: String){
        return this.http.get<User>('/api/users/getUserById/'+ id);
    }

    updateUser(user: User){
        return this.http.put<any>('/api/users/', user);
    }
}