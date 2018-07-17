import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BrickType } from '../models/brick-type.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BrickTypeService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getBrickTypes(curNick?){
    
    var apiString = curNick ? ('/api/brickTypes/getByNickname/' + curNick) 
                            : ('/api/brickTypes/getByUserId/' + this.authService.CurrentUser._id);

    return this.http.get(apiString)
        .map((res: Response) => res.json());
  }

  createBrickType(brickType: BrickType){
    return this.http.post('/api/brickTypes', brickType)
      .map((res: Response) => res.json());
  }

  updateBrickType(brickType: BrickType){
    return this.http.put('/api/brickTypes', brickType)
      .map((res: Response) => res.json());
  }

  deleteBrickType(id){
    return this.http.delete('/api/brickTypes/' + id)
      .map((res: Response) => res.json());
  }

}
