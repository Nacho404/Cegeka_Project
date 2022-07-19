using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Users;
using NbcArchitect.Application.Users.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NbcArchitect.Web.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsAdministrationController : ControllerBase
    {
        private readonly AccountAdministrationService _service;
        private readonly UserManager<User> _userManager;

        public AccountsAdministrationController(AccountAdministrationService service, UserManager<User> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IEnumerable<AccountDto>> Get()
        {
            return await _service.GetAll();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] AccountDto dto)
        {

            User user = await _service.Update(dto);

            if (dto.changePassword)
            {
                if (!ValidatePassword(dto.Password))
                {
                    throw new InvalidUserModelException("Password doesn't respect requirements!");
                }

                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, dto.Password);
            }

            if(dto.CurrentlyRoleName != dto.NewRoleName)
            {
                await _userManager.RemoveFromRoleAsync(user, dto.CurrentlyRoleName);
                await _userManager.AddToRoleAsync(user, dto.NewRoleName);
            }
           
            return Ok(user);
        }

        [HttpPost("{roleName}")]
        public async Task<IActionResult> Insert([FromBody] RegisterDto model, string roleName)
        {
            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                throw new DuplicateObjectException("User already registered with this email address");

            if(roleName == null || roleName == "")
            {
                throw new InvalidUserModelException("Role name can't be null or empty!");
            }

            if (!ValidatePassword(model.Password))
            {
                throw new InvalidUserModelException("Password doesn't respect requirements!");
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
                await _userManager.AddToRoleAsync(user, roleName);
            }
            return Ok("User created successfully!");
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(string userId)
        {
            var userDetails = await _service.GetUserDetails(userId);
            
            if (userDetails.RoleName == UserRoles.Administrator)
            {
                throw new InvalidRoleException("Can not delete user with Administrator role");
            }

            if (userDetails.HasProjects)
            {
                throw new Exception("User has projects!");
            }

            await _service.DeleteUserTokens(userDetails.UserTokens);

            var user = userDetails.User;

            await _userManager.RemovePasswordAsync(user);
            await _userManager.RemoveFromRoleAsync(user, userDetails.RoleName);
            await _userManager.DeleteAsync(user);
            return Ok("User successfully deleted");
        }

        private bool ValidatePassword(string password)
        {
            if (password.Any(char.IsUpper) == false
                || password.Length < 8 == true
                || password.All(char.IsLetterOrDigit) == true
                || password.Any(char.IsDigit) == false)
                return false;
            return true;
        }
    }
}
