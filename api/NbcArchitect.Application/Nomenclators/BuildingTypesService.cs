using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.Nomenclators
{
    public class BuildingTypesService
    {
        private readonly NbcContext _context;

        public BuildingTypesService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<BuildingType>> GetAll()
        {
            return await _context.BuildingTypes.ToListAsync();
        }

        public async Task<BuildingType> Insert(BuildingTypeDto dto)
        {
            var buildingType = await _context.BuildingTypes.FirstOrDefaultAsync(buildingType => buildingType.Name == dto.Name);
            if (buildingType != null)
            {
                throw new DuplicateObjectException($"Building type with the name {dto.Name} aleready exists");
            }

            var newBuildingType = new BuildingType()
            {
                Name = dto.Name
            };

            _context.BuildingTypes.Add(newBuildingType);
            _context.SaveChanges();
            return newBuildingType;
        }

        public async Task<BuildingType> Update(BuildingTypeDto buildingType, int id)
        {
            var existingBuildingType = await _context.BuildingTypes.FirstOrDefaultAsync(existingBuildingType => existingBuildingType.Name == buildingType.Name);
            if (existingBuildingType != null)
            {
                throw new DuplicateObjectException($"Building type with the name {buildingType.Name} aleready exists");
            }

            var updatedBuildingType = _context.Find<BuildingType>(id)
                                      ?? throw new NotFoundException(
                                          $"Building type with id={id} was not found");


            updatedBuildingType.Name = buildingType.Name;
            _context.SaveChanges();
            return updatedBuildingType;
        }

        public async Task Delete(int id)
        {
            var hasProjectsAttached = _context.Projects.Any(b => b.BuildingTypeId == id);

            if (hasProjectsAttached != false)
                throw new UnexpectedAssociationsOnDeletion("The building type you are trying to delete has several projects associated with it");
            var existingBuildingType = _context.BuildingTypes.Find(id)
                                        ?? throw new NotFoundException(
                                                                  $"Building type with id={id} was not found");

            _context.BuildingTypes.Remove(existingBuildingType);
            await _context.SaveChangesAsync();
        }
    }
}
