using AngularAppDataServer.Service;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AngularAppDataServer.Infrastructure
{
    public class AuthenticationMiddleware: IMiddleware
    {
        private readonly AuthService authService;

        public AuthenticationMiddleware(AuthService authService)
        {
            this.authService = authService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (context.Request.Method != "OPTIONS")
            {
                string authHeader = context.Request.Headers["Authorization"];
                try
                {
                    var user = await authService.GetUserInfo(authHeader).ConfigureAwait(false);
                    if (user != null)
                    {
                        await next.Invoke(context);
                    }
                    else
                    {
                        context.Response.StatusCode = 401;
                        return;
                    }
                }
                catch (Exception)
                {
                    context.Response.StatusCode = 401;
                    return;
                }
            }
            else
            {
                await next.Invoke(context);
            }
        }
    }
}
