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

class User implements IUserType {
    login: string;
    password: string;
    name: string;
    rights: UserRights;

    constructor(login: string, password: string, name: string, rights: UserRights) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.rights = rights;
    }
}

export const currentUser: User = new User('admin', 'test', 'empty', UserRights.Admin);