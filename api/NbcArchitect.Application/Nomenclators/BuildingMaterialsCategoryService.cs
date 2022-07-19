using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.Nomenclators
{
    public class BuildingMaterialsCategoryService
    {
        private readonly NbcContext _context;

        public BuildingMaterialsCategoryService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<BuildingMaterialsCategory>> GetAll()
        {
            return await _context.BuildingMaterialsCategories.ToListAsync();
        }

        public async Task<BuildingMaterialsCategory> Get(int id)
        {
            return await _context.BuildingMaterialsCategories
                .FirstOrDefaultAsync(c => c.Id == id) 
                ?? throw new NotFoundException("Category doesn't exist");
        }

        public async Task<BuildingMaterialsCategory> Insert(BuildingMaterialsCategoryDto dto)
        {
            var buildingMaterials = await _context.BuildingMaterialsCategories
                .FirstOrDefaultAsync(x => x.Name == dto.Name);
            
            if (buildingMaterials != null)
            {
                throw new DuplicateObjectException($"Category material with the name {dto.Name} aleready exists");
            }

            var newBuildingMaterialsCategory = new BuildingMaterialsCategory()
            {
                Name = dto.Name
            };

            _context.BuildingMaterialsCategories.Add(newBuildingMaterialsCategory);
            await _context.SaveChangesAsync();
            return newBuildingMaterialsCategory;
        }

        public async Task<BuildingMaterialsCategory> Update(BuildingMaterialsCategoryDto dto, int id)
        {
            var buildingMaterials = await _context.BuildingMaterialsCategories
                .FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (buildingMaterials != null)
            {
                throw new DuplicateObjectException($"Category material with the name {dto.Name} aleready exists");
            }

            var updatedBuildingMaterialsCategory = _context.Find<BuildingMaterialsCategory>(id) ?? throw new NotFoundException(
                                                        $"Category material with id={id} was not found");


            updatedBuildingMaterialsCategory.Name = dto.Name;
            await _context.SaveChangesAsync();
            return updatedBuildingMaterialsCategory;
        }

        public async Task Delete(int id)
        {
            var subCategory = _context.BuildingMaterialsSubcategories.FirstOrDefault(sc => sc.CategoryId == id);

            if (subCategory != null)
                throw new UnexpectedAssociationsOnDeletion("The category you are trying to delete has several subcategories associated with it");

            var deleteBuildingMaterialsCategory = _context.Find<BuildingMaterialsCategory>(id)
                                     ?? throw new NotFoundException(
                                         $"Category material with id= {id} was not found");

            _context.Remove(deleteBuildingMaterialsCategory);
            await _context.SaveChangesAsync();
        }
    }
}
