using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PostsApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;

namespace PostsApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserInfoController:ControllerBase
    {
        private UserInfo[] _userInfo;

        public UserInfoController()
        {
            _userInfo = new UserInfo[] {
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

        [HttpPost]
        public UserInfo[] GetUserInfos()
        {
            return _userInfo;
        }

        [HttpGet]
        public UserInfo GetUserInfo()
        {
            return _userInfo[1];
        }

        [HttpGet]
        public UserInfo GetUserInfoByName(string name)
        {
            return _userInfo.FirstOrDefault(e => string.Equals(e.Login, name, System.StringComparison.OrdinalIgnoreCase));
        }

        [HttpPost]
        public void UpdateUserInfoByLogin(UserInfo userInfo)
        {
            var findUser = _userInfo.FirstOrDefault(e => string.Equals(e.Login, userInfo.Login, System.StringComparison.OrdinalIgnoreCase));
            if (findUser != null)
            {
                findUser.Name = userInfo.Name;
                findUser.Surname = userInfo.Surname;
                findUser.Email = userInfo.Email;
            }
        }

        [HttpPost]
        [Route("/token")]
        public IActionResult Token(string login, string password)
        {
            ClaimsIdentity identity = GetIdentity(login,password);
            if (identity == null)
            {
                return BadRequest(new {errorText = "Не верное имя пользователя или пароль"});
            }
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
 
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };
 
            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            var user = _userInfo.FirstOrDefault(e => e.Login == login && e.Password == password);
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