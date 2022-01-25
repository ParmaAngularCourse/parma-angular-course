export type UserType = {
  login: string;
  permissions: PermissionUser[];
};

export enum PermissionUser {
  view = 'view',
  save = 'save',
  delete = 'delete',
}
