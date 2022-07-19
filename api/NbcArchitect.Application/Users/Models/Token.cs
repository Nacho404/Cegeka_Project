using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NbcArchitect.Application.Users.Models
{
    public class Token
    {
        public string TokenValue { get; set; }
        public string RefreshToken { get; set; }
    }
}
