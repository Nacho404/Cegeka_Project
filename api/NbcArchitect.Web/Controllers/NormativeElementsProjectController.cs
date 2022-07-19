using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.NormativeElements;
using NbcArchitect.Application.NormativeElements.Models;
using NbcArchitect.Domain;


namespace NbcArchitect.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class NormativeElementsProjectController : Controller
    {
        private readonly NormativeElementService _normativeElementService;
        public NormativeElementsProjectController(NormativeElementService normativeElementService)
        {
            _normativeElementService = normativeElementService;
        }

        [HttpGet("{idBuildingType}")]
        public async Task<IEnumerable<NormativeElement>> GetNBT(int idBuildingType)
        {
            return await _normativeElementService.GetNormativesForBuildingType(idBuildingType);
        }
    }
}
