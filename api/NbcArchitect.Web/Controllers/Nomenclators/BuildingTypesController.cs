using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Nomenclators.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Domain.Nomenclators;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NbcArchitect.Web.Controllers.Nomenclators
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingTypesController : ControllerBase
    {
        private readonly BuildingTypesService _service;

        public BuildingTypesController(BuildingTypesService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<BuildingType>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuildingTypeDto dto)
        {
            BuildingType buildingType = await _service.Insert(dto);
            return Ok(buildingType);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] BuildingTypeDto buildingType, int id)
        {
            var obj = await _service.Update(buildingType, id);
            return Ok(obj);
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

