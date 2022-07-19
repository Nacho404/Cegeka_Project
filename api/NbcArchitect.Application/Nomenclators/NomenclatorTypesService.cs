using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Data;

namespace NbcArchitect.Application.Nomenclators
{
    public class NomenclatorTypesService
    {
        private readonly NbcContext _context;
        private readonly int BuildingTypesId = 1;
        private readonly int BuildingMaterialCategoryId = 2;
        private readonly int BuildingMaterialsSubcategoryId = 3;
        private readonly int BuildingMaterialId = 4;
        private readonly int BuildingElementsTypeId = 5;
        private readonly int FireResistanceTimeId=6;

        public NomenclatorTypesService(NbcContext context)
        {
            _context = context;
        }

        public List<NomenclatorTypeDto> GetNomenclatureTypes()
        {
            return new List<NomenclatorTypeDto>
            {
                new NomenclatorTypeDto
                {
                    Id = BuildingTypesId,
                    Name = "Tipuri de cladiri",
                    Route = "/nomenclatoare/tipuricladire",
                    IconUrl = "apartment",
                    NumberOfItems = _context.BuildingTypes.Count()
                },

                new NomenclatorTypeDto
                {
                    Id = BuildingMaterialCategoryId,
                    Name = "Categorii materiale de constructie",
                    Route = "/nomenclatoare/categoriimateriale",
                    IconUrl = "horizontal_split",
                    NumberOfItems = _context.BuildingMaterialsCategories.Count()
                },

                new NomenclatorTypeDto
                {
                    Id = BuildingMaterialsSubcategoryId,
                    Name = "Subcategorii materiale de constructie",
                    Route = "/nomenclatoare/subcategoriimateriale",
                    IconUrl = "donut_small",
                    NumberOfItems = _context.BuildingMaterialsSubcategories.Count()
                },

                new NomenclatorTypeDto
                {
                    Id = BuildingMaterialId,
                    Name = "Materiale de constructie",
                    Route = "/nomenclatoare/materiale",
                    IconUrl = "layers",
                    NumberOfItems = _context.BuildingMaterials.Count()
                },

                new NomenclatorTypeDto
                {
                    Id = BuildingElementsTypeId,
                    Name = "Elemente de constructie",
                    Route = "/nomenclatoare/elementeconstructie",
                    IconUrl = "foundation",
                    NumberOfItems = _context.BuildingElementsTypes.Count()
                },

                 new NomenclatorTypeDto
                {
                    Id = FireResistanceTimeId,
                    Name = "Timp rezistență la foc",
                    Route = "/nomenclatoare/timprezistentafoc",
                    IconUrl = "schedule",
                    NumberOfItems = _context.FireResistances.Count()
                }
            };
        }
    }
}