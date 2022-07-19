using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.Nomenclators
{
    public class BuildingElementsTypeService
    {
        private readonly NbcContext _context;

        public BuildingElementsTypeService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<BuildingElementsType>> GetAll()
        {
            return await _context.BuildingElementsTypes.ToListAsync();
        }

        public async Task<BuildingElementsType> Get(int id)
        {
            return await _context.BuildingElementsTypes
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException(
                    $"Element with id ={id} was not found");
        }

        public async Task<BuildingElementsType> Insert(BuildingElementsTypeDto dto)
        {
            var dbElement = await _context.BuildingElementsTypes
                .FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (dbElement != null)
            {
                throw new DuplicateObjectException(
                    $"Element with the name {dto.Name} aleready exists");
            }

            var newElement = new BuildingElementsType()
            {
                Name = dto.Name
            };

            _context.BuildingElementsTypes.Add(newElement);
            await _context.SaveChangesAsync();
            return newElement;
        }

        public async Task<BuildingElementsType> Update(BuildingElementsTypeDto dto, int id)
        {
            var dbElement = await _context.BuildingElementsTypes
                .FirstOrDefaultAsync(x => x.Name == dto.Name);

            if (dbElement != null)
            {
                throw new DuplicateObjectException(
                    $"Element with the name {dto.Name} aleready exists");
            }

            var updateElement = _context.Find<BuildingElementsType>(id)
                ?? throw new NotFoundException(
                    $"Category material with id={id} was not found");

            updateElement.Name = dto.Name;
            await _context.SaveChangesAsync();
            return updateElement;
        }

        public async Task Delete(int id)
        {
            var deleteElement = _context.Find<BuildingElementsType>(id)
                ?? throw new NotFoundException(
                    $"Element with id= {id} was not found");

            _context.BuildingElementsTypes.Remove(deleteElement);
            await _context.SaveChangesAsync();
        }
    }
}
