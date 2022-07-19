using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Nomenclators.Models
{
    public class BuildingMaterialsSubcategoryDto
    {
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }

        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int CategoryId { get; set; }
    }
}
