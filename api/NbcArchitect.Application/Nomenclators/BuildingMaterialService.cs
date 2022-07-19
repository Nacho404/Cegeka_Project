using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;


namespace NbcArchitect.Application.Nomenclators
{
    public class BuildingMaterialService
    {
        private readonly NbcContext _context;

        public BuildingMaterialService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<BuildingMaterial>> GetAll()
        {
            return await _context.BuildingMaterials
                .Include(subcategory => subcategory.BuildingMaterialsSubcategory)
                .ThenInclude(category => category.BuildingMaterialsCategory)
                .ToListAsync();
        }

        public async Task<List<BuildingMaterial>> FindContaining(string pattern)
        {
            if(string.IsNullOrEmpty(pattern))
            {
                return await GetAll();
            }

            return await _context.BuildingMaterials
              .Include(subcategory => subcategory.BuildingMaterialsSubcategory)
              .ThenInclude(category => category.BuildingMaterialsCategory)
              .Where(material => material.Name.Contains(pattern)
                   || material.Id.ToString().Contains(pattern)
                   || material.Hui.ToString().Contains(pattern)
                   || material.BuildingMaterialsSubcategory.Name.Contains(pattern)
                   || material.BuildingMaterialsSubcategory.BuildingMaterialsCategory.Name.Contains(pattern))
              .ToListAsync();
        } 

        public async Task<BuildingMaterial> Get(int id)
        {
            return await _context.BuildingMaterials
                .FirstOrDefaultAsync(x => x.Id == id) 
                ?? throw new NotFoundException(
                    $"Material with id={id} was not found");
        }

        public async Task<BuildingMaterial> Insert(BuildingMaterialDto dto)
        {
            var dbMaterial = await _context.BuildingMaterials
                .FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (dbMaterial != null)
            {
                throw new DuplicateWaitObjectException(
                    $"Material with the name {dto.Name} aleready exists");
            }

            var dbSubcategory = await _context.BuildingMaterialsSubcategories
                .Include(x => x.BuildingMaterialsCategory)
                .FirstOrDefaultAsync(x => x.Id == dto.SubcategoryId)
                ?? throw new InvalidForeignKeyException(
                    $"Subcategory material with id={dto.SubcategoryId} was not found");

            var newMaterial = new BuildingMaterial()
            {
                Name = dto.Name,
                SubcategoryId = dto.SubcategoryId,
                Hui = dto.Hui
            };

            _context.BuildingMaterials.Add(newMaterial);
            await _context.SaveChangesAsync();
            return newMaterial;
        }

        public async Task<BuildingMaterial> Update(BuildingMaterialDto dto, int id)
        {

            var dbMaterial = await Get(id);

            var dbSubcategory = await _context.BuildingMaterialsSubcategories
                .Include(x => x.BuildingMaterialsCategory)
                .FirstOrDefaultAsync(x => x.Id == dto.SubcategoryId)
                ?? throw new InvalidForeignKeyException(
                    $"Subcategory with id={dto.SubcategoryId} was not found");

            if(dbMaterial.Name != dto.Name)
            {
                var material = await _context.BuildingMaterials
                    .FirstOrDefaultAsync(x => x.Name == dto.Name);
                if(material != null)
                {
                    throw new DuplicateObjectException(
                        $"Material with the name {dto.Name} aleready exists");
                }
            }

            dbMaterial.Name = dto.Name;
            dbMaterial.SubcategoryId = dto.SubcategoryId;
            dbMaterial.Hui = dto.Hui;

            await _context.SaveChangesAsync();
            return dbMaterial;
        }

        public async Task Delete(int id)
        {
            var deleteMaterial = _context.BuildingMaterials.Find(id)
                                       ?? throw new NotFoundException(
                                           $"Material with id={id} was not found");
            var hasProjectsAttached = _context.Projects.Any(b => b.BuildingMaterials.Contains(deleteMaterial));
            if (hasProjectsAttached != false)
                throw new UnexpectedAssociationsOnDeletion("The building material you are trying to delete has several projects associated with it");
           
            _context.BuildingMaterials.Remove(deleteMaterial);
            await _context.SaveChangesAsync();
        }
    }
}
