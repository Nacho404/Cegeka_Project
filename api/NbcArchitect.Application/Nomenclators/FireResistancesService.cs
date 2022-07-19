using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.Nomenclators
{
    public class FireResistancesService
    {
        private readonly NbcContext _context;
        public FireResistancesService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<FireResistance>> GetAll()
        {
            return await _context.FireResistances
                .Include(element => element.BuildingElementsType)
                .Include(degree => degree.FireResistanceDegree)
                .ToListAsync();
        }
        public async Task<List<FireResistanceDegree>> GetAllFireDegrees()
        {
            return await _context.FireDegrees
                .ToListAsync();
        }
        public async Task<FireResistance> Get(int id)
        {
            return await _context.FireResistances
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException(
                    $"Fire resistance with id ={id} was not found");
        }
        public async Task<FireResistance> Insert(FireResistanceDto dto)
        {

            var dbElement = await _context.BuildingElementsTypes
                .FirstOrDefaultAsync(x => x.Id == dto.BuildingElementTypeId)
                ?? throw new InvalidForeignKeyException(
                    $"Element with id={dto.BuildingElementTypeId} was not found");

            var dbDegree = await _context.FireDegrees
                .FirstOrDefaultAsync(x => x.Id == dto.FireResistanceDegreeId)
                ?? throw new InvalidForeignKeyException(
                    $"Element with id={dto.FireResistanceDegreeId} was not found");

            var newFireResistance = new FireResistance()
            {
                BuildingElementTypeId = dto.BuildingElementTypeId,
                FireResistanceDegreeId = dto.FireResistanceDegreeId,
                Time = dto.Time,
            };

            _context.FireResistances.Add(newFireResistance);
            await _context.SaveChangesAsync();
            return newFireResistance;
        }
        public async Task<FireResistance> Update(FireResistanceDto dto, int id)
        {
            var dbFireResistance = await Get(id);

            var dbElement = await _context.BuildingElementsTypes
                .FirstOrDefaultAsync(x => x.Id == dto.BuildingElementTypeId)
                ?? throw new InvalidForeignKeyException(
                    $"Element with id={dto.BuildingElementTypeId} was not found");

            var dbDegree = await _context.FireDegrees
                .FirstOrDefaultAsync(x => x.Id == dto.FireResistanceDegreeId)
                ?? throw new InvalidForeignKeyException(
                    $"Fire degree with id={dto.FireResistanceDegreeId} was not found");

            var updateFireResistance = _context.Find<FireResistance>(id)
                ?? throw new NotFoundException(
                    $"Fire resistance with id={id} was not found");

            updateFireResistance.BuildingElementTypeId = dto.BuildingElementTypeId;
            updateFireResistance.FireResistanceDegreeId = dto.FireResistanceDegreeId;
            updateFireResistance.Time = dto.Time;

            await _context.SaveChangesAsync();
            return updateFireResistance;
        }
        public async Task Delete(int id)
        {
            var deleteFireResistance = _context.Find<FireResistance>(id)
                ?? throw new NotFoundException(
                    $"Fire resistance with id= {id} was not found");

            _context.FireResistances.Remove(deleteFireResistance);
            await _context.SaveChangesAsync();
        }
    }
}
