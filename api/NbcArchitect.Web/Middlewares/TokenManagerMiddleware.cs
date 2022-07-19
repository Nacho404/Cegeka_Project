using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using NbcArchitect.Application.Users;

namespace NbcArchitect.Web.Middlewares
{
    public class TokenManagerMiddleware: IMiddleware
    {
        private readonly UserTokenService _userTokenService;
        public TokenManagerMiddleware(UserTokenService userTokenService)
        {
            _userTokenService = userTokenService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var authorizationHeader = context.Request.Headers["Authorization"];
            if (string.IsNullOrWhiteSpace(authorizationHeader))
            {
                await next(context);
                return;
            }

            if (await _userTokenService.IsUserTokenValid(context.User.FindFirst(ClaimTypes.Email)?.Value, authorizationHeader.ToString()?.Substring(7)))
            {
                await next(context);

                return;
            }
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        }
    }

    public static class TokenManagerMiddlewareExtensions
    {
        public static IApplicationBuilder UseTokenManagerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenManagerMiddleware>();
        }
    }
}
