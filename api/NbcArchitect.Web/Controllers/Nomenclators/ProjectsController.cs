using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NbcArchitect.Application.Projects;
using NbcArchitect.Application.Projects.Models;

namespace NbcArchitect.Web.Controllers.Nomenclators;

[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _service;

    public ProjectsController(ProjectService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<GetProjectDto>> Get()
    {
        var userId = GetUserId();
        var userRoleName = GetUserRoleName();
        return await _service.GetAll(userRoleName, userId);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ProjectDto dto)
    {
        var userId = GetUserId();
        var project = await _service.Insert(dto, userId);
        return Ok(project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] ProjectDto dto, int id)
    {
        var userId = GetUserId();
        var project = await _service.Update(dto, id, userId);
        return Ok(project);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return Ok();
    }

    private string GetUserId()
    {
        return HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    private string GetUserRoleName()
    {
        return HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
    }
}