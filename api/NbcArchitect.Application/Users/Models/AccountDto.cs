using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Users.Models
{
    public class AccountDto
    {
        public string Id { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "FirstName must contain only letters")]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "LastName must contain only letters")]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string RoleId { get; set; }

        [Required]
        public string CurrentlyRoleName { get; set; }

        public string NewRoleName { get; set; }

        public bool changePassword { get; set; }

        public string Password { get; set; }
    }
}
