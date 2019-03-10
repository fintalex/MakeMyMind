import { Condition } from "./condition";

export class Goal {
    _id?: string;
    name: string;
    status: number;
    user?: string;
    createdDate?: Date;
    finishDate?: Date;

    conditions: Array<Condition>;
}

