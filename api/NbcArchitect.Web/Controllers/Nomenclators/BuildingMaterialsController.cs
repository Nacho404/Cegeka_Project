using System;
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
    public class BuildingMaterialsController : ControllerBase
    {
        private readonly BuildingMaterialService _service;

        public BuildingMaterialsController(BuildingMaterialService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<BuildingMaterial>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuildingMaterialDto dto)
        {

            BuildingMaterial category = await _service.Insert(dto);
            return Ok(category);

        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] BuildingMaterialDto dto, int id)
        {

            BuildingMaterial material = await _service.Update(dto, id);
            return Ok(material);

        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            await _service.Delete(id);
            return Ok();

        }

        [HttpGet]
        [Route("search")]
        public async Task<IEnumerable<BuildingMaterial>> FindPattern(string pattern)
        {
            return await _service.FindContaining(pattern);
        }


    }
}
