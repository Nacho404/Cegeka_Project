using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NbcArchitect.Domain;
using System.Threading.Tasks;
using NbcArchitect.Application.Users.Models;
using System;
using Microsoft.Extensions.Configuration;
using NbcArchitect.Common.Exceptions;
using System.Linq;
using NbcArchitect.Data;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using NbcArchitect.Application.Users;
using NbcArchitect.Web.Security;

namespace NbcArchitect.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtManagerRepository _jWTManager;
        private readonly UserTokenService _userTokenService;

        public AuthenticateController(UserManager<User> userManager, IJwtManagerRepository jWTManager, UserTokenService userTokenService)
        {
            _jWTManager = jWTManager;
            _userManager = userManager;
            _userTokenService = userTokenService;   
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                throw new DuplicateObjectException("User already registered with this email address");

            if (!validatePassword(model.Password))
            {
                throw new InvalidUserModelException("Password doesn't respect requirements!");
            }

            if(!validateNameAndFirstName(model.LastName, model.FirstName))
            {
                throw new InvalidUserModelException("Last name or first name doesn't respect requirements!");
            }

            User user = new()
            {
                LastName = model.LastName,
                FirstName = model.FirstName,
                Email = model.Email,
                UserName = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()

            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                throw new InvalidUserModelException(result.Errors.FirstOrDefault().Description);
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "Architect");
            }
            return Ok("User created successfully!");
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        [Route("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _userTokenService.Delete(HttpContext.User.FindFirst(ClaimTypes.Email)?.Value, HttpContext.Request.Headers["Authorization"].ToString()?.Substring(7));
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = _jWTManager.Authenticate(user,_userManager);

                if (token == null)
                {
                    throw new UnauthorizedAccessException("Token is null!");
                }

                await _userTokenService.Insert(user, token.TokenValue);

                return Ok(token);
            }
            throw new UnauthorizedAccessException("Incorrect email or password!");
        }
        private bool validatePassword(string password)
        {
            if (password.Any(char.IsUpper) == false
                || password.Length < 8 == true
                || password.All(char.IsLetterOrDigit) == true
                || password.Any(char.IsDigit) == false)
                return false;
            return true;
        }

        private bool validateNameAndFirstName(string name, string firstName)
        {
            if(name.All(char.IsLetter) == false 
                || firstName.All(char.IsLetter) == false)
                return false;
            return true;
        }
    }
}
