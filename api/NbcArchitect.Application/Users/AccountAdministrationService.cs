using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Users.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain;

namespace NbcArchitect.Application.Users
{
    public class AccountAdministrationService
    {
        private readonly NbcContext _context;

        public AccountAdministrationService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<AccountDto>> GetAll()
        {
            return await _context.Users
                .Select(u => new AccountDto {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    RoleId = _context.UserRoles.FirstOrDefault(ur => ur.UserId == u.Id).RoleId
                }).Select(account => new AccountDto {
                        Id = account.Id,
                        FirstName = account.FirstName,
                        LastName = account.LastName,
                        Email = account.Email,
                        CurrentlyRoleName = _context.Roles.FirstOrDefault(r => r.Id == account.RoleId).Name,
                        RoleId = "",
                        NewRoleName = "",
                        changePassword = false,
                        Password = ""
                }).ToListAsync();
        }


        //Aici zace un fost student (Iulian Ivanov)

        public async Task<User> Update(AccountDto dto)
        {
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == dto.Id);

            if(dbUser == null)
            {
                throw new NotFoundException(
                    $"User with id={dto.Id} was not found");
            }

            dbUser.FirstName = dto.FirstName;
            dbUser.LastName = dto.LastName;
            dbUser.Email = dto.Email;
            dbUser.UserName = dto.Email;

            await _context.SaveChangesAsync();
            return dbUser;
        }
        public async Task<UserDetails> GetUserDetails(string userId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).Select(
                u => new UserDetails
                {
                    User = u,
                    RoleName = _context.Roles.FirstOrDefault(r =>
                            _context.UserRoles.Where(ur => ur.UserId == userId).Select(ur => ur.RoleId).Contains(r.Id))!
                        .Name,
                    HasProjects = _context.Projects.Any(p => p.UserId == userId),
                    UserTokens = _context.UserTokens.Where(p => p.UserId == userId).ToList()
                }
            ).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new NotFoundException($"Element with id= {userId} was not found");
            }

            return user;
        }

        public async Task DeleteUserTokens(List<UserToken> userTokens)
        {
            _context.UserTokens.RemoveRange(userTokens);
            await _context.SaveChangesAsync();
        }
    }
}