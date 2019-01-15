import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { BrickType } from '../../models/brick-type.model';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrickTypeService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getBrickTypes(curNick?){
        debugger;
        if (!this.authService.CurrentUser){
            return;
        }
        var apiString = curNick ? ('/api/brickTypes/getByNickname/' + curNick) 
                                : ('/api/brickTypes/getByUserId/' + this.authService.CurrentUser._id);

        return this.http.get<any>(apiString);
            //.map((res: Response) => res.json());
    }

    getBrickType(id){
        debugger;
        return this.http.get<any>('/api/brickTypes/' + id);
            //.map((res: Response) => res.json());
    }

    createBrickType(brickType: BrickType){
        return this.http.post<any>('/api/brickTypes', brickType);
            // .map((res: Response) => res.json());
    }

    updateBrickType(brickType: BrickType){
        return this.http.put<any>('/api/brickTypes', brickType);
            //.map((res: Response) => res.json());
    }

    deleteBrickType(id){
        return this.http.delete<any>('/api/brickTypes/' + id);
            //.map((res: Response) => res.json());
    }

    // this method we need to start once a day in the night (at 00:00)
    updateSkippedDays(){
        return this.http.post<any>('/api/brickTypes/updateskippeddays', {});
    }
}
