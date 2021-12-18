import { Permission } from "./Permission";
import { User } from "./User";

export const CurrentUser:User = {
    Permissions: [
        new Permission("Delete", true),
        new Permission("Save", true)
    ]
}