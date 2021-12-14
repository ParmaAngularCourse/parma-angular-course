export class Permission{
    public Key: string = ""
    public Access: boolean = false

    constructor(key:string, access: boolean)
    {
        this.Key = key;
        this.Access = access;
    }
}