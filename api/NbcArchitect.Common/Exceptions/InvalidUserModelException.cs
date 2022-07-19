using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NbcArchitect.Common.Exceptions
{
    public class InvalidUserModelException : Exception
    {
        public InvalidUserModelException(string message) : base(message)
        {
        }
    }
}
