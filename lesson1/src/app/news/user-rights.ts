
export type User = {
    Name: string,
    Rights: UserRight
}

export type UserRight = {
    CanDelete: boolean,
    CanSave: boolean
}

