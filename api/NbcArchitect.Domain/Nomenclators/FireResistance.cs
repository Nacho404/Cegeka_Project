using CSharpFunctionalExtensions;
using System.ComponentModel.DataAnnotations.Schema;


namespace NbcArchitect.Domain.Nomenclators
{
    public class FireResistance : Entity<int>
    {
        public int BuildingElementTypeId { get; set; }
        public int FireResistanceDegreeId { get; set; }
        public int Time { get; set; }

        [ForeignKey("BuildingElementTypeId")]
        public virtual BuildingElementsType BuildingElementsType { get; set; }
        [ForeignKey("FireResistanceDegreeId")]
        public virtual FireResistanceDegree FireResistanceDegree { get; set; }
    }
}
