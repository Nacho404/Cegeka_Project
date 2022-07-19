using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NbcArchitect.Domain.Nomenclators
{
    public class BuildingElementsType:Entity<int>
    {
        public string Name { get; set; }
    }
}
