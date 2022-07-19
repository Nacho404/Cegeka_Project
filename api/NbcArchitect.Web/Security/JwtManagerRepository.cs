using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NbcArchitect.Application.Users.Models;
using NbcArchitect.Domain;
using NbcArchitect.Web.Security;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace WebApplicationJwtAuth.Security
{
    public class JwtManagerRepository : IJwtManagerRepository
    {
        private readonly IConfiguration config;
        public JwtManagerRepository(IConfiguration configuration, UserManager<User> userManager)
        {
            this.config = configuration;
        }

        public Token Authenticate(User user,UserManager<User>_userManager)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(config["JWT:Key"]);
            var userRoles = _userManager.GetRolesAsync(user).Result;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
               new Claim(ClaimTypes.Name, user.FirstName+" "+user.LastName),
               new Claim(ClaimTypes.Email, user.Email),
               new Claim(ClaimTypes.NameIdentifier, user.Id),
               new Claim(ClaimTypes.Role, userRoles.First())
              }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Token { TokenValue = tokenHandler.WriteToken(token) };
        }
    }
}
