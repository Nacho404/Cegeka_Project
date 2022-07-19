using Microsoft.EntityFrameworkCore;
using NbcArchitect.Domain;
using NbcArchitect.Domain.Nomenclators;
using System.ComponentModel.DataAnnotations.Schema;

namespace NbcArchitect.Application.NormativeElements.Models;

public class NormativeElementDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public List<NormativeElementDto> Children { get; set; } = new List<NormativeElementDto>();
    public HierarchyId HierarchyId { get; set; }
    public int Level { get; set; }
    public bool IsActive { get; set; }
    public int Order { get; set; }
    public BuildingType BuildingType { get; set; }
    public int BuildingTypeId { get; set; }

}