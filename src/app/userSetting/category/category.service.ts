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
        if (!this.authService.CurrentUser){
            return;
        }
        return this.http.get<any>('/api/categories/getByUserId/' + this.authService.CurrentUser._id);
    }

    createCategory(category: Category){
        return this.http.post<any>('/api/categories', category);
    }

    updateCategory(category: Category){
        return this.http.put<any>('/api/categories', category);
    }

    deleteCategory(id){
        return this.http.delete<any>('/api/categories/' + id);
    }
}
