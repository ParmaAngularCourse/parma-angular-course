import { Permission } from "./Permission";

export class User{
    public login: string = "";
    public password: string = "";
    public name: string = "";
    public surname: string = "";
    public email: string = "";
    public permissions: Array<Permission> = [];
}