using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Nomenclators.Models
{
    public class BuildingMaterialDto
    {
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }

        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public double Hui { get; set; }

        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int SubcategoryId { get; set; }
    }
}
