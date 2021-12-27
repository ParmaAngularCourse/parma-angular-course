import { Permission } from "./Permission";

export class User{
    public login: string = "";
    public password: string = "";
    public permissions: Array<Permission> = [];
}