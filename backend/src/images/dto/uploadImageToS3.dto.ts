import { IsNotEmpty } from "class-validator";

export class UploadImageToS3 {
    @IsNotEmpty()
    readonly image: string;
}
