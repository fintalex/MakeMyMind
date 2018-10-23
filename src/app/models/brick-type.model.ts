import { Category } from "./category.model";

export class BrickType {
    _id: string;
    name: string;
    sign: string;
    ruleDescription: string;
    createdDate: Date;
    //isRemoved: boolean;
    category: Category;
    user: string;
    isPrivate: Boolean;

    ticked: Boolean;
    isIcon: Boolean;

    type: Number; // 1- permanent, 2- for period.
    status: Number; // 1- active, 2- closed (for permanent), 3- successed (for period), 4- failed (for period)
    neededDays: Number;
    countMarked: Number;
    allowedSkipDays: Number;
    skippedDays: Number;

    public constructor(
        fields?: {
        // one line per field with name and type
        }) {
        if (fields) Object.assign(this, fields);
    }
}