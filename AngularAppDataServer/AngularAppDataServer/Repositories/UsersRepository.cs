using AngularAppDataServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAppDataServer.Repositories
{
    public class UsersRepository
    {
        private List<User> usersCollection = new List<User>
        {
            new User
            { 
                Login = "user1",
                Password = "password1",
                Name = "Ivan",
                Surname = "Ivanovich",
                Email = "ivan_ivanovich@mail.ru",
                Permissions = new List<Permission>
                {
                    new Permission("Delete", true),
                    new Permission("Save", true),
                    new Permission("Profile", true),
                }
            }
        };

        internal Task<User> GetUserInfo(string login, string password)
        {
            var authUser = usersCollection.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (authUser == null)
            {
                authUser = new User();
                //throw new Exception("Неверно введен логин или пароль");
            }
            return Task.FromResult(authUser);
        }

        internal Task<User> UpdateUserProfile(User user)
        {
            var authUser = usersCollection.FirstOrDefault(x => x.Login == user.Login && x.Password == user.Password);
            if (authUser == null)
            {
                throw new Exception("Не удалось найти пользователя");
            }
            else
            {
                authUser.Name = user.Name;
                authUser.Surname = user.Surname;
                authUser.Email = user.Email;                
            }

            return Task.FromResult(authUser);
        }
    }
}
