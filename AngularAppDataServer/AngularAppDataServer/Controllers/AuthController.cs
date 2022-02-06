using AngularAppDataServer.Models;
using AngularAppDataServer.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AngularAppDataServer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly ExecuteService executeService;

        public AuthController(ExecuteService executeService, AuthService authService)
        {
            this.executeService = executeService;
            this.authService = authService;
        }        

        [HttpGet]
        public async Task<ServiceResponse<User>> GetUserInfo()
        {
            string authHeader = HttpContext.Request.Headers["Authorization"];
            return await executeService.TryExecute(() => authService.GetUserInfo(authHeader));
        }

        [HttpPost]
        public async Task<ServiceResponse<User>> UpdateUserProfile(User user)
        {            
            return await executeService.TryExecute(() => authService.UpdateUserProfile(user));
        }
    }
}
