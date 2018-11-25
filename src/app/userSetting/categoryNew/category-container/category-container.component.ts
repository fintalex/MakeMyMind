import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromSelectors from '../../../store/selectors/category.selectors';
import * as categoryAction from '../../../store/actions/categories';

@Component({
    selector: 'category-container',
    templateUrl: './category-container.component.html',
    styleUrls: ['./category-container.component.scss']
})
export class CategoryContainerComponent implements OnInit {

    categories$: Observable<Category[]>;
    selected$: Observable<any>;

    constructor(private store: Store<fromSelectors.State>) {
        this.categories$ = this.store.pipe(select(fromSelectors.getAllCategories));

        this.selected$ = this.store.select(fromSelectors.getSelectedCategory);
    }

    onSelect(id: number){
        this.store.dispatch(new categoryAction.Select(id));
    }

    ngOnInit() {
        
    }

}
