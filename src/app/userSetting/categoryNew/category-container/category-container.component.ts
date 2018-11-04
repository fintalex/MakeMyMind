import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../store/reducers';
import * as categoryAction from '../../../store/actions/categories';

@Component({
    selector: 'category-container',
    templateUrl: './category-container.component.html',
    styleUrls: ['./category-container.component.scss']
})
export class CategoryContainerComponent implements OnInit {

    categories$: Observable<Category[]>;
    selected$: Observable<any>;

    constructor(private store: Store<fromRoot.State>) { 
        this.categories$ = store.select(fromRoot.getAllCategories);
        this.selected$ = store.select(fromRoot.getSelected);
    }

    onSelect(id: number){
        this.store.dispatch(new categoryAction.Select(id));
    }

    ngOnInit() {
        console.log("HELLO DUDE");
    }

}
