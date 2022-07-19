using System;

namespace NbcArchitect.Common.Exceptions
{
    public class DuplicateObjectException : Exception
    {
        public DuplicateObjectException(string message) : base(message)
        {
        }
    }
}
