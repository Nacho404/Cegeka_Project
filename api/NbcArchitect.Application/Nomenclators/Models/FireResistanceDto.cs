using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Nomenclators.Models
{
    public class FireResistanceDto
    {
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int BuildingElementTypeId { get; set; }
        [Required]
        [Range(0, 10, ErrorMessage = "The field must be positive")]
        public int FireResistanceDegreeId { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int Time { get; set; }
    }
}
