using System;

namespace NbcArchitect.Common.Exceptions
{
    public class InvalidForeignKeyException : Exception
    {
        public InvalidForeignKeyException(string message) : base(message)
        {
        }
    }
}
