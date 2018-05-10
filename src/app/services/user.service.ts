import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';

@Injectable()
export class UserService{

    constructor(private http: Http) {
    }

    updateUserLocale(user: User) {
        return this.http.post('/api/users/updatelocale', user)
            .map((res: Response) => {
                return res.json();
            });
    }

}