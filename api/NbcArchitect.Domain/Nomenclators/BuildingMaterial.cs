using CSharpFunctionalExtensions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace NbcArchitect.Domain.Nomenclators
{
    public class BuildingMaterial : Entity<int>
    {
        public string Name { get; set; }
        public int SubcategoryId { get; set; }
        public double Hui { get; set; }

        [ForeignKey("SubcategoryId")]
        public BuildingMaterialsSubcategory BuildingMaterialsSubcategory { get; set; }
        public List<Project> Projects { get; set; }
    }
}