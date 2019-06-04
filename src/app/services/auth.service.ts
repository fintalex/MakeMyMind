import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService{

    CurrentUser: User = null;
    curLocale: string = 'ru';
    
    constructor(private http: HttpClient) {
        var userInStorage = localStorage.getItem('currentUser');
        if (userInStorage) {
            this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    updateCurrentUserInStorage() {
        localStorage.setItem('currentUser', JSON.stringify(this.CurrentUser));
    }

    login(email: string, password: string){
        return this.http.post<any>('/api/users/login', { email: email, password: password }).pipe(
            map((res: Response) => {
                let response: any = res;
                console.log(response.msg);
                let user = response.user;
                if (user && response.success){
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.CurrentUser = user;
                } 
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.CurrentUser = null;
    }

}