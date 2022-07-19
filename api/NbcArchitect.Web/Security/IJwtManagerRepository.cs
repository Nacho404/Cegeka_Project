using Microsoft.AspNetCore.Identity;
using NbcArchitect.Application.Users.Models;
using NbcArchitect.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace NbcArchitect.Web.Security
{
    public interface IJwtManagerRepository
    {
        Token Authenticate(User users, UserManager<User> _userManager);
    }
}
