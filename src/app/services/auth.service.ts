import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';

@Injectable()
export class AuthService{

    CurrentUser: User;

    constructor(private http: Http) {
        var userInStorage = localStorage.getItem('currentUser');
        if (userInStorage) {
            this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    login(email: string, password: string){
        return this.http.post('/api/users/login', { email: email, password: password })
            .map((res: Response) => {
                let response = res.json();
                console.log(response.msg);
                let user = response.user;
                if (user && response.success){
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.CurrentUser = user;
                } 
                return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.CurrentUser = null;
    }

}