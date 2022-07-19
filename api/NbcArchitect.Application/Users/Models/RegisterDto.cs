using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Users.Models
{
    public class RegisterDto
    {
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "LastName must contain only letters")]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string LastName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "FirstName must contain only letters")]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string FirstName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }

    }
}

