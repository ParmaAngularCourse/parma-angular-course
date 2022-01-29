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
using PostsApi.Service;

namespace PostsApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserInfoController:ControllerBase
    {
        private UserInfoService _userInfoService;

        public UserInfoController(UserInfoService userInfoService)
        {
            this._userInfoService = userInfoService;
        }

        [HttpPost]
        public UserInfo[] GetUserInfos()
        {
            return _userInfoService.GetUsers();
        }

        [HttpGet]
        public UserInfo GetUserInfo()
        {
            return _userInfoService.GetUsers()[1];
        }

        [HttpPost]
        [Authorize]
        public UserInfo GetUserInfoByLogin(string login)
        {
            return _userInfoService.GetUserInfoByLogin(login);
        }

        [HttpPost]
        [Authorize]
        public void UpdateUserInfoByLogin(UserInfo userInfo)
        {
            _userInfoService.UpdateUserInfoByLogin(userInfo);
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
            return this._userInfoService.GetIdentity(login, password);
        }
    }
}