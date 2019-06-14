import { Condition } from "./condition";
import * as moment from 'moment';

export class Goal {
    _id?: string;
    name: string;
    status: number;
    user?: string;
    createdDate?: Date;
    finishDate?: Date;

    conditions: Array<Condition>;

    constructor(){
        this.conditions = [];
        this.createdDate = new Date();
        this.finishDate = moment().add(10, 'days').toDate();
        this.status = 1;
    }
}

