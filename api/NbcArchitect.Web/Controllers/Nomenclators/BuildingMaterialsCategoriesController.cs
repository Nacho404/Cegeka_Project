using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Web.Controllers.Nomenclators
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingMaterialsCategoriesController : ControllerBase
    {
        private readonly BuildingMaterialsCategoryService _service;

        public BuildingMaterialsCategoriesController(BuildingMaterialsCategoryService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IEnumerable<BuildingMaterialsCategory>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuildingMaterialsCategoryDto dto)
        {
            BuildingMaterialsCategory category = await _service.Insert(dto);
            return Ok(category);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] BuildingMaterialsCategoryDto dto, int id)
        {

            BuildingMaterialsCategory category = await _service.Update(dto, id);
            return Ok(category);
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
