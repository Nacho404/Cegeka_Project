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
    public class FireResistancesController : ControllerBase
    {
        private readonly FireResistancesService _service;
        public FireResistancesController(FireResistancesService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("FireDegrees")]
        public async Task<IEnumerable<FireResistanceDegree>> GetFireDegrees()
        {
            return await _service.GetAllFireDegrees();
        }

        [HttpGet]
        public async Task<IEnumerable<FireResistance>> Get()
        {
            return await _service.GetAll();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FireResistanceDto dto)
        {

            FireResistance fireResistance = await _service.Insert(dto);
            return Ok(fireResistance);

        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] FireResistanceDto dto, int id)
        {

            FireResistance fireResistance = await _service.Update(dto, id);
            return Ok(fireResistance);

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
