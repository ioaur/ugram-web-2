export default interface UpdateImageDto {
    readonly uploadedBy?: string;
    readonly description?: string;
    readonly url?: string;
    readonly tags?: string[];
    readonly mention?: string;
}
