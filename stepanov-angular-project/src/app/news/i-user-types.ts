export enum UserRights {
    Ordinary,
    Admin
}

interface IUserType {
    login: string;
    password: string;
    name: string;
    rights: UserRights;
}

export class User implements IUserType {
    login: string;
    password: string;
    name: string;
    rights: UserRights;
    token: string;

    constructor(login: string, password: string, name: string, token: string, rights: UserRights) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.rights = rights;
        this.token = token;
    }
}