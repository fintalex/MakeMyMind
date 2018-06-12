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
}