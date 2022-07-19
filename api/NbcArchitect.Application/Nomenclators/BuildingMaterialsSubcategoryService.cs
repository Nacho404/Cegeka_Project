using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.Nomenclators
{
    public class BuildingMaterialsSubcategoryService
    {
        private readonly NbcContext _context;

        public BuildingMaterialsSubcategoryService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<BuildingMaterialsSubcategory>> GetAll()
        {
            return await _context.BuildingMaterialsSubcategories
                        .Include(x => x.BuildingMaterialsCategory)
                        .ToListAsync();
        }

        public async Task<BuildingMaterialsSubcategory> Get(int id)
        {
            return await _context.BuildingMaterialsSubcategories
                .FirstOrDefaultAsync(x => x.Id == id) 
                ?? throw new NotFoundException(
                    $"Material subcategory with id={id} was not found");
        }

        public async Task<BuildingMaterialsSubcategory> Insert(BuildingMaterialsSubcategoryDto dto)
        {
            var dbSubcategory = await _context.BuildingMaterialsSubcategories
                .FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (dbSubcategory != null)
            {
                throw new DuplicateObjectException(
                    $"Subcategory with the name {dto.Name} already exists");
            }

            var dbCategory = await _context.BuildingMaterialsCategories
                    .FirstOrDefaultAsync(x => x.Id == dto.CategoryId)
                    ?? throw new InvalidForeignKeyException(
                        $"Category with id={dto.CategoryId} was not found");

            var newSubcategory = new BuildingMaterialsSubcategory()
            {
                Name = dto.Name,
                CategoryId = dto.CategoryId
            };

            _context.BuildingMaterialsSubcategories.Add(newSubcategory);
            await _context.SaveChangesAsync();
            return newSubcategory;
        }

        public async Task<BuildingMaterialsSubcategory> Update(BuildingMaterialsSubcategoryDto dto, int id)
        {
            var dbSubcategory = await Get(id);

            var dbCategory = await _context.BuildingMaterialsCategories
                   .FirstOrDefaultAsync(x => x.Id == dto.CategoryId)
                   ?? throw new InvalidForeignKeyException(
                       $"Category with id={dto.CategoryId} was not found");

            if (dbSubcategory.Name != dto.Name)
            {
                var subcategory = await _context.BuildingMaterialsSubcategories
                        .FirstOrDefaultAsync(x => x.Name == dto.Name);
                if (subcategory != null)
                {
                    throw new DuplicateObjectException(
                        $"Subcategory with the name {dto.Name} aleready exists");
                }
            }

            dbSubcategory.Name = dto.Name;
            dbSubcategory.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return dbSubcategory;
        }

        public async Task Delete(int id)
        {
            var buildingMaterial = _context.BuildingMaterials.FirstOrDefault(bm => bm.SubcategoryId == id);

            if (buildingMaterial != null)
                throw new UnexpectedAssociationsOnDeletion("The sub category you are trying to delete has several building materials associated with it");

            var deleteSubcategory = _context.BuildingMaterialsSubcategories.Find(id)
                                        ?? throw new NotFoundException(
                                            $"Category material with id={id} was not found");

            _context.BuildingMaterialsSubcategories.Remove(deleteSubcategory);
            await _context.SaveChangesAsync();
        }
    }
}
