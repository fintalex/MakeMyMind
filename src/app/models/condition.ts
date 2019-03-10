import { BrickType } from "./brick-type.model";

export class Condition {
    brickType: BrickType;
    color?: string;
    isIcon?: boolean;
    sign?: string;
    type?: number;
    neededCount: number;
    markedCount?: number;
}