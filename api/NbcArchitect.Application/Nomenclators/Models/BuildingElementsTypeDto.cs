using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NbcArchitect.Application.Nomenclators.Models
{
    public class BuildingElementsTypeDto
    {
        [Required]
        [MaxLength(32, ErrorMessage = "Too Long")]
        [MinLength(2, ErrorMessage = "Too short")]
        public string Name { get; set; }
    }
}
