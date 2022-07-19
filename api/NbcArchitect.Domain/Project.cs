using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;
using System.ComponentModel.DataAnnotations.Schema;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Domain
{
    public class Project: Entity<int>
    {
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public string UserId { get; set; }
        [ForeignKey("BuildingTypeId")]
        public virtual BuildingType BuildingType { get; set; }
        public int BuildingTypeId { get; set; }
        public string Name { get; set; }
        public float Length { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
        public bool HasUndergroundFloors { get; set; }
        public bool HasElevator { get; set; }
        public float TechnicalLeadDensity { get; set; }
        public bool IsDraft { get; set; }
        public List<BuildingMaterial> BuildingMaterials { get; set; }
    
    }
}
