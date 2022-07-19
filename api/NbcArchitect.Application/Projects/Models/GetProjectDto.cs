using System.ComponentModel.DataAnnotations;
using static NbcArchitect.Application.Projects.ProjectService;

namespace NbcArchitect.Application.Projects.Models
{
    public class GetProjectDto
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public UserCredetials UserName { get; set; }
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int BuildingTypeId { get; set; }
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string BuildingTypeName { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public float Length { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public float Width { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public float Height { get; set; }
        [Required]
        public bool HasUndergroundFloors { get; set; }
        [Required]
        public bool HasElevator { get; set; }
        [Required]
        public float TechnicalLeadDensity { get; set; }
        [Required]
        public bool IsDraft { get; set; }
        public List<string> buildingMaterialsNames{ get; set; }
        public List<int> buildingMaterialsIds { get; set; }

        public GetProjectDto()
        {

        }
    }
}
