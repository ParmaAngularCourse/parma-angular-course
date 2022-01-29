using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using PostsApi.Models;

namespace PostsApi.Service
{
    public class UserInfoService
    {
        private UserInfo[] _users;

        public UserInfoService() {
            _users = new UserInfo[] {
                new UserInfo() {
                    Email = "mail1@mail.com",
                    Surname = "Surname user1",
                    Name = "Name user1",
                    Login = "user1",
                    Password = "user1",
                    Permissions = new Permission[] {Permission.view, Permission.save, Permission.delete}
                },
                new UserInfo() {
                    Email = "mail2@mail.com",
                    Surname = "Surname user2",
                    Name = "Name user2",
                    Login = "user2",
                    Password = "user2",
                    Permissions = new Permission[] {Permission.view}
                },
            };
        }

        public UserInfo[] GetUsers()
        {
            return this._users;
        }

        public UserInfo GetUserInfoByLogin(string login)
        {
            return this._users.FirstOrDefault(e => string.Equals(e.Login, login, System.StringComparison.OrdinalIgnoreCase));
        }

        public void UpdateUserInfoByLogin(UserInfo userInfo)
        {
            var findUser = this._users.FirstOrDefault(e => string.Equals(e.Login, userInfo.Login, System.StringComparison.OrdinalIgnoreCase));
            if (findUser != null)
            {
                findUser.Name = userInfo.Name;
                findUser.Surname = userInfo.Surname;
                findUser.Email = userInfo.Email;
            }
        }

        public ClaimsIdentity GetIdentity(string login, string password)
        {
            var user = _users.FirstOrDefault(e => e.Login == login && e.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}