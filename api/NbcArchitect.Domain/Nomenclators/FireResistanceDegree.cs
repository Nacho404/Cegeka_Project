using CSharpFunctionalExtensions;
using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Domain.Nomenclators
{
    public class FireResistanceDegree : Entity<int>
    {
        [Required]
        [MaxLength(5)]
        public string Name { get; set; }
    }

}
