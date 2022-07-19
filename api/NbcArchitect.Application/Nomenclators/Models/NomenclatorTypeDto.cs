namespace NbcArchitect.Application.Nomenclators.Models
{
    public class NomenclatorTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string IconUrl { get; set; }

        public string Route { get; set; }

        public int NumberOfItems { get; set; }
    }
}
