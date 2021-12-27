using AngularAppDataServer.Models;
using AngularAppDataServer.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAppDataServer.Service
{
    public class AuthService
    {
        private readonly UsersRepository usersRepository;

        public AuthService(UsersRepository usersRepository)
        {
            this.usersRepository = usersRepository;
        }

        internal async Task<User> GetUserInfo(string authHeader)
        {
            if (string.IsNullOrEmpty(authHeader))
            {
                throw new Exception("Пустые авторизационные данные");
            }

            var authParam = authHeader.Split("||");
            if (authParam.Count() != 2)
            {
                throw new Exception("Неверные авторизационные данные");
            }

            var login = authParam[0];
            var password = authParam[1];
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
            {
                throw new Exception("Неполные авторизационные данные");
            }

            return await usersRepository.GetUserInfo(login, password).ConfigureAwait(false);
        }
    }
}
