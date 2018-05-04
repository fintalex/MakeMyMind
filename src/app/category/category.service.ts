import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from '../models/category.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CategoryService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  
  getCategories(){
    return this.http.get('/api/categories/getByUserId/' + this.authService.CurrentUser._id)
      .map((res: Response) => {
        return res.json();
      });
  }

  createCategory(category: Category){
    return this.http.post('/api/categories', category)
      .map((res: Response) => res.json());
  }

  updateCategory(category: Category){
    return this.http.put('/api/categories', category)
      .map((res: Response) => res.json());
  }

  deleteCategory(id){
    return this.http.delete('/api/categories/' + id)
      .map((res: Response) => res.json());
  }
}
