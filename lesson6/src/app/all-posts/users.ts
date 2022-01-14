export type UserType = {
    name: string,
    permissions: PermissionUser[]
}

export enum PermissionUser {
    view = 'view',
    save = 'save',
    delete = 'delete'
}

