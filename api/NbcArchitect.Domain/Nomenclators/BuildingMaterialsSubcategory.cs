using CSharpFunctionalExtensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace NbcArchitect.Domain.Nomenclators
{
    public class BuildingMaterialsSubcategory : Entity<int>
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual BuildingMaterialsCategory BuildingMaterialsCategory { get; set; }
    }
}
