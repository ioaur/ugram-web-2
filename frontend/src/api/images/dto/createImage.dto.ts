export default interface CreateImageDto {
    readonly description?: string;
    readonly url: string;
    readonly tags?: string[];
    readonly mention?: string;
}
