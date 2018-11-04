import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../../models/user.model';
import { startWith, debounceTime, map, switchMap, distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { FrendService } from '../frend.service';
import { Frend } from '../../../models/frend.model';

@Component({
  selector: 'frend-search',
  templateUrl: './frend-search.component.html',
  styleUrls: ['./frend-search.component.scss'],
  outputs: ['addFrendEvent']
})
export class FrendSearchComponent implements OnInit {

    private addFrendEvent = new EventEmitter();

    searchControl = new FormControl();
    
    frendsResult: User[];
    
    filteredOptions: any;
  
    constructor(private userService: UserService,) { }

    ngOnInit() {        

        this.filteredOptions = this.searchControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((data: any) => {
                if (data && data.length > 1){
                    this.userService.getUserDDL(data).subscribe((userList: any) =>{
                        this.frendsResult = userList
                    })
                }
            })
    }

    displayFn(user: User) {
        if (user) { return user.nickname + ' (' + user.username + ')'; }
    }

    isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    addFrend(){
        
        if (typeof this.searchControl.value === 'object'){
            // var frend = new Frend();
            // frend.statusId = 1;
            // frend.frend = this.searchControl.value._id;
            // frend.user = '';

            this.addFrendEvent.emit(this.searchControl.value._id);

            this.searchControl.reset();

            this.frendsResult = [];
        }
    }

}
