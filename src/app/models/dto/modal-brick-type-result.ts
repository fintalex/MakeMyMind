import { BrickType } from "../brick-type.model";
import { CloseBrickTypeResult } from "../enums/close-brick-type-action";

export class ModalBrickTypeResult {
    brickType?: BrickType;
    action: CloseBrickTypeResult;
    brickTypeId?: string;
}