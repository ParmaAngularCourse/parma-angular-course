export type UserType = {
    name: string,
    permissions: Array<PermissionUser>
}

export enum PermissionUser {
    view = 'view',
    save = 'save',
    delete = 'delete'
}

export let user1: UserType = {
    name: 'User1',
    permissions:[ PermissionUser.view, PermissionUser.save, PermissionUser.delete]
}

export const user2: UserType = {
    name: 'User2',
    permissions:[ PermissionUser.view]
}