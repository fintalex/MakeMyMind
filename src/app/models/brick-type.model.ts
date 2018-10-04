import { Category } from "./category.model";

export class BrickType {
    _id: string;
    name: string;
    sign: string;
    ruleDescription: string;
    createdDate: Date;
    isRemoved: boolean;
    category: Category;
    user: string;
    isPrivate: Boolean;

    ticked: Boolean;
    isIcon: Boolean;

    public constructor(
        fields?: {
        // one line per field with name and type
        }) {
        if (fields) Object.assign(this, fields);
    }
}