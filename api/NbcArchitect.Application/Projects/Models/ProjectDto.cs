using NbcArchitect.Domain;
using NbcArchitect.Domain.Nomenclators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NbcArchitect.Application.Projects.Models
{
    public class ProjectDto
    {
      
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }
        [Required]
        [Range(0, Int32.MaxValue, ErrorMessage = "The field must be positive")]
        public int BuildingTypeId { get; set; }
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
        public List<int> buildingMaterialsIds { get; set; }
    }
}
