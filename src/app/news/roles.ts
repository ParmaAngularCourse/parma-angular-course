export enum Role {
  GlobalDeleter,
  ModalSaver
}

export const myRoles: Role[] = [Role.ModalSaver, Role.GlobalDeleter];
export const users = [{ login: "mvd", password: "123", roles: [Role.ModalSaver, Role.GlobalDeleter] }];
