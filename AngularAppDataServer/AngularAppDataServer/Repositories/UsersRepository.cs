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
                Permissions = new List<Permission>
                {
                    new Permission("Delete", true),
                    new Permission("Save", true),
                }
            }
        };

        internal Task<User> GetUserInfo(string login, string password)
        {
            var authUser = usersCollection.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (authUser == null)
            {
                throw new Exception("Неверно введен логин или пароль");
            }
            return Task.FromResult(authUser);
        }
    }
}
