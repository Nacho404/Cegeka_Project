using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Nomenclators;
using NbcArchitect.Application.Nomenclators.Models;
using System.Collections.Generic;

namespace NbcArchitect.Web.Controllers.Nomenclators
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class NomenclatorTypesController : ControllerBase
    {
        
        private readonly NomenclatorTypesService _service;

        public NomenclatorTypesController(NomenclatorTypesService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<NomenclatorTypeDto> Get()
        {
            return _service.GetNomenclatureTypes();
        }

    }
}
