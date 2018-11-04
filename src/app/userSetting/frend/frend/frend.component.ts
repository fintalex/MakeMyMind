import { Component, OnInit } from '@angular/core';
import { FrendService } from '../frend.service';
import { Frend } from '../../../models/frend.model';
import { MatDialog } from '@angular/material';
import * as _ from 'underscore';
import { DialogService } from '../../../components/dialogs/dialog.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ModalParams } from '../../../models/modal-params.model';

@Component({
    selector: 'frend',
    templateUrl: './frend.component.html',
    styleUrls: ['./frend.component.scss']
})
export class FrendComponent implements OnInit {

    myFrends: Frend[];

    constructor(
        private frendService: FrendService,
        private authService: AuthService,
        private dialog: MatDialog,
        private modalDialogs: DialogService,
        private userService: UserService) { }

    ngOnInit() {
        if (!this.authService.CurrentUser.helper.frendsMainHelp){
            var bottomSheetParams: ModalParams = {
                disableClose: true, 
                okButtonTitle: "Понял", 
                cancelButtonTitle: "Пропустить",
                message: `Здесь Вы можете найти своих <b class="chocolate">друзей</b> по 
                    <b class="chocolate">email</b> или по <b class="chocolate">nickname</b>
                    и <b class="chocolate">отправить запрос</b> в друзья.
                    Также здесь вы можете просмотреть все <b class="chocolate">входящие запросы</b> в друзья.
                    `
            };

            this.modalDialogs.showBottomSheet(bottomSheetParams)
                .subscribe((res)=>{
                    // here we must save or dismiss Understanding
                    this.authService.CurrentUser.helper.frendsMainHelp = res;
                    this.authService.updateCurrentUserInStorage();
                    this.userService.updateUserHelper(this.authService.CurrentUser)
                        .subscribe(res => console.log("User helper is updated"));
                });
        }

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
            .subscribe((createdFrend: any) => {

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
