using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Web.Controllers.Nomenclators
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingElementsTypesController : ControllerBase
    {
        private readonly BuildingElementsTypeService _service;

        public BuildingElementsTypesController(BuildingElementsTypeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<BuildingElementsType>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuildingElementsTypeDto dto)
        {
            BuildingElementsType element = await _service.Insert(dto);
            return Ok(element);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] BuildingElementsTypeDto dto, int id)
        {
            BuildingElementsType element = await _service.Update(dto, id);
            return Ok(element);
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
