export class Permission{
    public key: string = ""
    public access: boolean = false

    constructor(key:string, access: boolean)
    {
        this.key = key;
        this.access = access;
    }
}