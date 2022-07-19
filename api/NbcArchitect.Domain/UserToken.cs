using System.ComponentModel.DataAnnotations.Schema;
using CSharpFunctionalExtensions;

namespace NbcArchitect.Domain;

public class UserToken : Entity<int>
{
    public string UserId { get; set; }
    public string Token { get; set; }

    [ForeignKey("UserId")] 
    public virtual User User { get; set; }
}