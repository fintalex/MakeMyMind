import { Component, OnInit } from '@angular/core';
import { FrendService } from '../frend.service';
import { Frend } from '../../models/frend.model';

@Component({
    selector: 'frend',
    templateUrl: './frend.component.html',
    styleUrls: ['./frend.component.scss']
})
export class FrendComponent implements OnInit {

    myFrends: Frend[];

    constructor(private frendService: FrendService) { }

    ngOnInit() {
        this.frendService.getFrends()   
            .subscribe(allFrends => {
                this.myFrends = allFrends;
            });
    }

    onAddFrend(frendId) {
        this.frendService.addFrend(frendId)
            .subscribe(createdFrend => {

                var newFrend = new Frend();
              
                newFrend.frendId = createdFrend.frend._id;
                newFrend.frendNickname = createdFrend.frend.nickname;
                newFrend.frendUsername = createdFrend.frend.username;
                newFrend.requestForYou = 0;
                newFrend.requestStatus = createdFrend.frend.requestStatus;
                newFrend._id = createdFrend._id;

                this.myFrends.push(newFrend);
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
}
