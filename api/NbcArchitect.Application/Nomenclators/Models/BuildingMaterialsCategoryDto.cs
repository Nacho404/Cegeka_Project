using System.ComponentModel.DataAnnotations;

namespace NbcArchitect.Application.Nomenclators.Models
{
    public class BuildingMaterialsCategoryDto
    {
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }
    }
}
