using Microsoft.EntityFrameworkCore;
using NbcArchitect.Data;
using NbcArchitect.Domain;

namespace NbcArchitect.Application.Users;

public class UserTokenService 
{
    private readonly NbcContext _context;

    public UserTokenService(NbcContext context)
    {
        _context = context;
    }

    public async Task<bool> IsUserTokenValid(string email, string token)
    {
        return await _context.UserTokens.AnyAsync(t => t.User.Email == email && t.Token == token);
    }

    public async Task Insert(User user, string token)
    {
        var newUserToken = new UserToken
        {
            Token = token,
            User = user
        };

        await _context.UserTokens.AddAsync(newUserToken);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(string email, string token)
    {
        var existingUserToken =
            await _context.UserTokens.FirstOrDefaultAsync(t => t.User.Email == email && t.Token == token);

        if (existingUserToken is not null)
        {
            try
            {
                _context.UserTokens.Remove(existingUserToken);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

            }
        }
    }
}