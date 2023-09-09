import { Users as User } from "./user.entity";

export class UserSerializer{

    static serialize(user: User): any {
        return{
            id: user.id,
            phoneNumber: user.phoneNumber,
            firstname: user.firstname,
            lastname: user.lastname,
            profileImageFileName: user.profileImageFileName?`/my-image/${user.profileImageFileName}`:"/my-image/no-user-image.png",
            birthdate: user.birthdate,
        };
      }
}