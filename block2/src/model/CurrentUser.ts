import { Permission } from "./Permission";
import { User } from "./User";

export const CurrentUser:User = {
    Permissions: [
        new Permission("Delete", false),
        new Permission("Save", false)
    ]
}