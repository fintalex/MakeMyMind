import { Component, OnInit } from '@angular/core';
import { FrendService } from '../frend.service';
import { Frend } from '../../models/frend.model';
import { MatDialog } from '@angular/material';
import * as _ from 'underscore';

@Component({
    selector: 'frend',
    templateUrl: './frend.component.html',
    styleUrls: ['./frend.component.scss']
})
export class FrendComponent implements OnInit {

    myFrends: Frend[];

    constructor(private frendService: FrendService,
                public dialog: MatDialog) { }

    ngOnInit() {
        this.frendService.getFrends()   
            .subscribe(allFrends => {

                // ХИТРАЯ сортировка по определенному списку (1,3,2,5)
                this.sortFrends(allFrends);
            });
    }

    sortFrends(allFrends){
        this.myFrends = _.sortBy(allFrends, (frend)=>{
            var rank = {
                "1": 1,
                "3": 2,
                "2": 3,
                "5": 4
            };

            return rank[frend.statusId];
        });
    }

    onAddFrend(frendId) {
        var allFrends = this.myFrends;

        this.frendService.addFrend(frendId)
            .subscribe(createdFrend => {

                var newFrend = new Frend();
              
                newFrend.frendId = createdFrend.frend._id;
                newFrend.frendNickname = createdFrend.frend.nickname;
                newFrend.frendUsername = createdFrend.frend.username;
                newFrend.requestForYou = false;
                newFrend.statusId = createdFrend.statusId;
                newFrend._id = createdFrend._id;

                this.myFrends.push(newFrend);

                this.sortFrends(allFrends);
            });        
    }

    onDeleteFrend(frendId){

        var deletedId = frendId;
        var allFrends = this.myFrends;
        this.frendService.deleteFrend(deletedId)
            .subscribe(deletedFrend => {
                for (let i = 0; i < allFrends.length; i++) {
                    if (allFrends[i]._id === deletedId) {
                        allFrends.splice(i, 1);
                    }
                }
            });
    }

    onChangeFrendStatus(frend: Frend){
        var deletedId = frend._id;
        var allFrends = this.myFrends;
        this.frendService.changeFrendStatus(frend)
            .subscribe(changedFrend => {
                for (let i = 0; i < allFrends.length; i++) {
                    if (allFrends[i]._id === deletedId) {
                        allFrends[i].statusId = frend.statusId;
                    }
                }
            });
    }
}
