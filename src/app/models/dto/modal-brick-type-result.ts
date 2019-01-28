import { BrickType } from "../brick-type.model";
import { CloseBrickTypeResult } from "../close-brick-type-action";

export class ModalBrickTypeResult {
    brickType?: BrickType;
    action: CloseBrickTypeResult;
    brickTypeId?: string;
}