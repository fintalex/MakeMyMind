import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Brick } from '../models/brick.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BrickService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    getBricksForMonth(date: any) {
        var dto = {
            userId: this.authService.CurrentUser._id,
            date: date
        };
        return this.http.post('/api/bricks/getForMonth', dto)
            .map((res: Response) => {
                return res.json();
            });
    }

    createBrick(brick: Brick) {
        return this.http.post('/api/bricks', brick)
            .map((res: Response) => res.json());
    }

    updateBrick(brick: Brick) {
        return this.http.put('/api/bricks', brick)
            .map((res: Response) => res.json());
    }

    deleteBrick(id) {
        return this.http.delete('/api/bricks/' + id)
            .map((res: Response) => res.json());
    }

}
