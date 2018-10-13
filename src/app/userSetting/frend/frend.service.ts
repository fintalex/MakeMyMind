import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Frend } from '../../models/frend.model';
import { AuthService } from './../../services/auth.service';

@Injectable()
export class FrendService{

    constructor(private http: Http,
                private authService: AuthService) {
    }

    getFrends(){
        return this.http.get('/api/frends/' + this.authService.CurrentUser._id)
            .map((res: Response) => res.json());
    }

    addFrend(frendId){
        var newFrend = new Frend();
        newFrend.frend = frendId;
        newFrend.user = this.authService.CurrentUser._id;
        newFrend.statusId = 1;
        return this.http.post('/api/frends', newFrend)
            .map((res: Response) => res.json());
    }

    deleteFrend(frendId){
        return this.http.delete('/api/frends/' + frendId)
            .map((res: Response) => res.json());
    }

    changeFrendStatus(frend: Frend){
        return this.http.post('/api/frends/changeStatus', frend)
            .map((res: Response) => res.json());
    }
}