using System;

namespace NbcArchitect.Common.Exceptions
{
    public class InvalidRoleException : Exception
    {
        public InvalidRoleException(string message) : base(message)
        {
        }
    }
}
