using Microsoft.AspNetCore.Mvc;
using PostsApi.Models;

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
                    Name = "user1",
                    Permissions = new Permission[] {Permission.view, Permission.save, Permission.delete}
                },
                new UserInfo() {
                    Name = "user2",
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
            return _userInfo[0];
        }
    }
}