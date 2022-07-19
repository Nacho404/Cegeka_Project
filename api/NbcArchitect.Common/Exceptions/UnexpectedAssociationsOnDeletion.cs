using System;

namespace NbcArchitect.Common.Exceptions
{
    public class UnexpectedAssociationsOnDeletion : Exception
    {
        public UnexpectedAssociationsOnDeletion(string message)
            : base(message)
        {
        }
    }
}