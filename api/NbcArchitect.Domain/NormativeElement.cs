using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using NbcArchitect.Domain.Nomenclators;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace NbcArchitect.Domain
{
    public class NormativeElement : Entity<int>
    {
        public NormativeElement() {
            
        }

        public NormativeElement(int id):base(id) {
            
        }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
        [ForeignKey("BuildingTypeId")]
        public BuildingType BuildingType { get; set; } //nullable
        public int Order { get; set; }
        public List<NormativeElement> Children { get; set; }
        public HierarchyId HierarchyId { get; set; }
        public int BuildingTypeId { get; set; }
    }
}