import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Brick } from '../models/brick.model';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrickService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getBricksForMonth(date: any, nick: string, filteredHabbits: any[]) {
        var dto = {
            userId: this.authService.CurrentUser._id,
            date: date,
            nick: nick,
            habbits: (filteredHabbits && filteredHabbits.length > 0) ? filteredHabbits : null
        };
        return this.http.post<any>('/api/bricks/getForMonth', dto);
            // .map((res: Response) => {
            //     return res.json();
            // });
    }

    createBrick(brick: Brick) {
        return this.http.post<any>('/api/bricks', brick);
            //.map((res: Response) => res.json());
    }

    createMultyBrick(brick: Brick) {
        return this.http.post<any>('/api/bricks/createMulty', brick);
            //.map((res: Response) => res.json());
    }

    updateBrick(brick: Brick) {
        return this.http.put<any>('/api/bricks', brick);
            //.map((res: Response) => res.json());
    }

    deleteBrick(id) {
        return this.http.delete<any>('/api/bricks/' + id);
            //.map((res: Response) => res.json());
    }

}
