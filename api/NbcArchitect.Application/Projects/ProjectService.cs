using Microsoft.EntityFrameworkCore;
using NbcArchitect.Application.Projects.Models;
using NbcArchitect.Application.Users.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain;
using NbcArchitect.Domain.Nomenclators;


namespace NbcArchitect.Application.Projects
{
    public class ProjectService
    {
        private readonly NbcContext _context;

        public ProjectService(NbcContext context)
        {
            _context = context;
        }

        public async Task<List<GetProjectDto>> GetAll(string userRoleName, string userId)
        {
            if(userRoleName == UserRoles.Administrator)
            {
                return await _context.Projects.Select(x => new GetProjectDto
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    UserName = new UserCredetials {
                        LastName = _context.Users.FirstOrDefault(u => u.Id == x.UserId).LastName,
                        FirstName = _context.Users.FirstOrDefault(u => u.Id == x.UserId).FirstName
                    },
                    Name = x.Name,
                    BuildingTypeId = x.BuildingTypeId,
                    BuildingTypeName = x.BuildingType.Name,
                    Length = x.Length,
                    Width = x.Width,
                    Height = x.Height,
                    HasUndergroundFloors = x.HasUndergroundFloors,
                    HasElevator = x.HasElevator,
                    TechnicalLeadDensity = x.TechnicalLeadDensity,
                    IsDraft = x.IsDraft,
                    buildingMaterialsNames = x.BuildingMaterials.Select(x => x.Name).ToList(),
                    buildingMaterialsIds = x.BuildingMaterials.Select(x => x.Id).ToList()
                }).ToListAsync();
            }

            return await _context.Projects.Select(x => new GetProjectDto
            {
                Id = x.Id,
                UserId = x.UserId,
                Name = x.Name,
                BuildingTypeId = x.BuildingTypeId,
                BuildingTypeName = x.BuildingType.Name,
                Length = x.Length,
                Width = x.Width,
                Height = x.Height,
                HasUndergroundFloors = x.HasUndergroundFloors,
                HasElevator = x.HasElevator,
                TechnicalLeadDensity = x.TechnicalLeadDensity,
                IsDraft = x.IsDraft,
                buildingMaterialsNames = x.BuildingMaterials.Select(x => x.Name).ToList(),
                buildingMaterialsIds = x.BuildingMaterials.Select(x => x.Id).ToList()
            }).Where(x => x.UserId == userId).ToListAsync();

        }

        public async Task<Project> Get(int id)
        {
            return await _context.Projects
                .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException(
                    $"Project with id={id} was not found");
        }

        public async Task<Project> Insert(ProjectDto dto, string userId)
        {
            var newProject = new Project()
            {
                Name = dto.Name,
                UserId =userId,
                BuildingTypeId = dto.BuildingTypeId,
                Length = dto.Length,
                Width = dto.Width,
                Height = dto.Height,
                HasUndergroundFloors = dto.HasUndergroundFloors,
                HasElevator = dto.HasElevator,
                TechnicalLeadDensity = dto.TechnicalLeadDensity,
                IsDraft = dto.IsDraft,
                BuildingMaterials = new List<BuildingMaterial>()
            };
                newProject.BuildingMaterials = await _context.BuildingMaterials.Where(x => dto.buildingMaterialsIds.Contains(x.Id)).ToListAsync();
            _context.Projects.Add(newProject);
            await _context.SaveChangesAsync();
            return newProject;
        }

        public async Task<Project> Update(ProjectDto dto, int id, string userId)
        {
            var dbProject = _context.Projects.Include(x => x.BuildingMaterials)
                .FirstOrDefault(x => x.Id == id);
            var buildingMaterials = await _context.BuildingMaterials.Where(x => dto.buildingMaterialsIds.Contains(x.Id)).ToListAsync();

            dbProject.Name = dto.Name;
            dbProject.UserId = userId;
            dbProject.BuildingTypeId = dto.BuildingTypeId;
            dbProject.Length = dto.Length;
            dbProject.Width = dto.Width;
            dbProject.Height = dto.Height;
            dbProject.HasUndergroundFloors = dto.HasUndergroundFloors;
            dbProject.HasElevator = dto.HasElevator;
            dbProject.TechnicalLeadDensity = dto.TechnicalLeadDensity;
            dbProject.IsDraft = dto.IsDraft;
            dbProject.BuildingMaterials = buildingMaterials;
            await _context.SaveChangesAsync();
            return dbProject;
        }

        public async Task Delete(int id)
        {
            var deleteProject = _context.Projects.Find(id)
                                        ?? throw new NotFoundException(
                                            $"Project with id={id} was not found");

            _context.Projects.Remove(deleteProject);
            await _context.SaveChangesAsync();
        }

        public class UserCredetials
        {
            public string LastName { get; set; }
            public string FirstName { get; set; }
        }
    }
}

