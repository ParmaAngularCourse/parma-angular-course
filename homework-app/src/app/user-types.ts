export type User = {
    name: string;
    isAdmin: boolean;
}

export const currentUser : User = {
    name: 'TestUser1',
    isAdmin: true
}
