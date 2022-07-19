using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Domain.Nomenclators;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NbcArchitect.Web.Controllers.Nomenclators
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingMaterialsSubcategoriesController : ControllerBase
    {
        private readonly BuildingMaterialsSubcategoryService _service;

        public BuildingMaterialsSubcategoriesController(BuildingMaterialsSubcategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<BuildingMaterialsSubcategory>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuildingMaterialsSubcategoryDto dto)
        {

            BuildingMaterialsSubcategory subcategory = await _service.Insert(dto);
            return Ok(subcategory);

        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] BuildingMaterialsSubcategoryDto dto, int id)
        {

            BuildingMaterialsSubcategory subcategory = await _service.Update(dto, id);
            return Ok(subcategory);

        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return Ok();
        }
    }
}
