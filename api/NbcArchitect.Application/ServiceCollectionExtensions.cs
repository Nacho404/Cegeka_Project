using Microsoft.Extensions.DependencyInjection;
using NbcArchitect.Application.NormativeElements;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Projects;
using NbcArchitect.Application.Users;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<NormativeElementService>();
            services.AddScoped<ProjectService>();
            services.AddScoped<BuildingTypesService>();
            services.AddScoped<BuildingMaterialService>();
            services.AddScoped<BuildingMaterialsCategoryService>();
            services.AddScoped<BuildingMaterialsSubcategoryService>();
            services.AddScoped<BuildingElementsTypeService>();
            services.AddScoped<NomenclatorTypesService>();
            services.AddScoped<FireResistancesService>();
            services.AddScoped<UserTokenService>();
            services.AddScoped<AccountAdministrationService>();
        }
    }
}