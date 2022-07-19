using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.NormativeElements;
using NbcArchitect.Application.NormativeElements.Models;
using NbcArchitect.Domain;
using NbcArchitect.Web.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NbcArchitect.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class NormativeElementsController : ControllerBase
    {
        private readonly NormativeElementService _normativeElementService;

        public NormativeElementsController(NormativeElementService normativeElementService)
        {
            _normativeElementService = normativeElementService;
        }

        [HttpGet]
        public async Task<IEnumerable<NormativeElementDto>> Get()
        {
            return await _normativeElementService.GetTitles();
        }

        [HttpGet("{id}")]
        public async Task<NormativeElementDto> Get(int id)
        {
            return await _normativeElementService.GetNormativeElement(id);
        }

        [HttpGet("{id}/nextChildTitle")]
        [AllowAnonymous]
        public async Task<TitleModel> GetNextChildTitle(int id) {
            return new TitleModel()
            {
                Title = await _normativeElementService.GetNextChildTitle(id)
            };
        }

        [HttpPost]
        public async Task<NormativeElement> Post (TransferNormativeElementDto dto)
        {
            return await _normativeElementService.Insert(dto);
        }

        [HttpPut("{id}")]
        public async Task<NormativeElement> Put(int id, TransferNormativeElementDto dto)
        {
            return await _normativeElementService.Update(id, dto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _normativeElementService.Delete(id);
            return Ok();
        }
    }
}