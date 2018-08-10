import { Component, OnInit, EventEmitter } from '@angular/core';
import { Frend } from '../../models/frend.model';
import { DialogService } from '../../components/dialogs/dialog.service';
import { ModalParams } from '../../models/modal-params.model';

@Component({
    selector: 'frend-list',
    templateUrl: './frend-list.component.html',
    styleUrls: ['./frend-list.component.scss'],
    inputs: ['frendList'],
    outputs: ['changeFrendStatus', 'deleteFrendEvent']
})
export class FrendListComponent implements OnInit {

    private changeFrendStatus = new EventEmitter();
    private deleteFrendEvent = new EventEmitter();

    frendList: Frend[];

    constructor(private dialogs: DialogService) { }

    ngOnInit() {
    }

    cancelFrend(frend: Frend){

        var conf: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите отменить заявку в друзья для ' + frend.frendNickname + ' (' + frend.frendUsername + ')?', 
            title: 'Отмена заявки'
        };

        this.dialogs.showConfirm(conf)
            .subscribe(result => {
                if (result == true){
                    this.deleteFrendEvent.emit(frend._id);
                }
            });
    }

    deleteFrend(frend: Frend){

        var conf: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите удалить ' + frend.frendNickname + ' (' + frend.frendUsername + ') из друзей?', 
            title: 'Удаление из друзей'
        };

        this.dialogs.showConfirm(conf)
            .subscribe(result => {
                if (result == true){
                    this.changeFrendStatus.emit({'_id': frend._id, 'statusId': 5});
                }
            });
    }

    rejectFrend(frend: Frend){
        var conf: ModalParams = {
            width: '300px', 
            message: 'Уверены, что хотите отклонить заявку ' + frend.frendNickname + ' (' + frend.frendUsername + ')?', 
            title: 'Отклонение заявки в друзья'
        };

        this.dialogs.showConfirm(conf)
            .subscribe(result => {
                if (result == true){
                    this.changeFrendStatus.emit({'_id': frend._id, 'statusId': 2});
                }
            });
    }

    addFrend(frend: Frend){
        var conf: ModalParams = {
            width: '300px', 
            message: 'Хотите добавить ' + frend.frendNickname + ' (' + frend.frendUsername + ') в друзья?', 
            title: 'Добавление в друзья'
        };

        this.dialogs.showConfirm(conf)
            .subscribe(result => {
                if (result == true){
                    this.changeFrendStatus.emit({'_id': frend._id, 'statusId': 3});
                }
            });
    }
}
