export type UserType = {
  name: string;
  surname: string;
  email: string;
  login: string;
  permissions: PermissionUser[];
};

export enum PermissionUser {
  view = 'view',
  save = 'save',
  delete = 'delete',
}
