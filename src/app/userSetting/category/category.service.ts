import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Category } from '../../models/category.model';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from  '@angular/common/http';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    
    getCategories(){
        return this.http.get<any>('/api/categories/getByUserId/' + this.authService.CurrentUser._id);
            // .map((res: Response) => {
            //     return res.json();
            // });
    }

    createCategory(category: Category){
        return this.http.post<any>('/api/categories', category);
            // .map((res: Response) => res.json());
    }

    updateCategory(category: Category){
        return this.http.put<any>('/api/categories', category);
            // .map((res: Response) => res.json());
    }

    deleteCategory(id){
        return this.http.delete<any>('/api/categories/' + id);
            //.map((res: Response) => res.json());
    }
}
