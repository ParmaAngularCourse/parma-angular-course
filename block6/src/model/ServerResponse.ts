export class ServerResponse<T>{
    public isSuccess:boolean = true
    public errorText:string = ""
    public data:T | undefined
}