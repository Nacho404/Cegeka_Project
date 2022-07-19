using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NbcArchitect.Application.Users.Models
{
    public class LoginDto
    {
        [EmailAddress]
        public string Email { get; set; }

        [MinLength(8, ErrorMessage = "Too short")]
        public string Password { get; set; }
    }
}
