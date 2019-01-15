export class Category {
    _id?: string;
    name: string;
    color: string;
    description: string;
    user?: string;
    updated?: Date;
    brickType?: any;
    ticked?: boolean;

    public constructor(
        fields?: {
        // one line per field with name and type
        }) {
        if (fields) Object.assign(this, fields);
    }
}