using NbcArchitect.Domain;

public class UserDetails
{
    public User User { get; set; }
    public string RoleName { get; set; }

    public bool HasProjects { get; set; }

    public List<UserToken> UserTokens { get; set; }
}