using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NbcArchitect.Domain.Nomenclators;

namespace NbcArchitect.Application.NormativeElements.Models
{
    public class TransferNormativeElementDto
    {
        public string Title { get; set; }
        public int? ParentId { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
        public int BuildingTypeId { get; set; }
    }
}
