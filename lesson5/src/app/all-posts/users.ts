export type UserType = {
    name: string,
    permissions: Array<PermissionUser>
}

export enum PermissionUser {
    view = 'view',
    save = 'save',
    delete = 'delete'
}

