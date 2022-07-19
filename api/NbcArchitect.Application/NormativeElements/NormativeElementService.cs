using System.Collections;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Types;
using NbcArchitect.Application.NormativeElements.Models;
using NbcArchitect.Common.Exceptions;
using NbcArchitect.Data;
using NbcArchitect.Domain;

namespace NbcArchitect.Application.NormativeElements
{
    public class NormativeElementService {
        private Regex _regex = new Regex(".*(?<Digit>\\d)$");
        private readonly NbcContext _nbcContext;

        public NormativeElementService(NbcContext nbcContext)
        {
            _nbcContext = nbcContext;
        }

        public async Task<string> GetNextChildTitle(int parentId) {
            HierarchyId? parentHierarchyId = null;
            parentHierarchyId = parentId > 0 ? 
                (await _nbcContext.NormativeElements.FindAsync(parentId))?.HierarchyId : HierarchyId.GetRoot();

            if (parentHierarchyId == null)
                return "";

            var childrenList = await _nbcContext.NormativeElements
                .Where(x => x.HierarchyId.IsDescendantOf(parentHierarchyId) && x.HierarchyId.GetLevel() == parentHierarchyId.GetLevel() + 1)
                .OrderBy(a => a.HierarchyId)
                .Select(x => new {x.Title})
                .ToListAsync();

            var lastChild = childrenList.LastOrDefault();
            if (lastChild == null)
                return "";

            var title = lastChild.Title;
            var match = _regex.Match(title);
            if (!match.Success) 
                return "";
            if (match.Groups.TryGetValue("Digit", out var group))
            {
                var nextDigit = (int.Parse(group.Value) + 1);
                return title[..^group.Length] + nextDigit;
            }
            return "";

        }

        public async Task<List<NormativeElementDto>> GetTitles() 
        {
            var query = from ne in _nbcContext.NormativeElements
                orderby ne.HierarchyId
                select new NormativeElement(ne.Id)
                {
                    BuildingTypeId = ne.BuildingTypeId,
                    Title = ne.Title,
                    HierarchyId = ne.HierarchyId,
                    IsActive = ne.IsActive,
                    Order = ne.Order
                };

            var elements = await query.ToListAsync();

            var root = new NormativeElement() { HierarchyId = HierarchyId.GetRoot() };
            elements.Insert(0, root);

            return MakeTree(elements).Children;
        }

        public async Task<List<NormativeElement>> GetNormativesForBuildingType(int idBuildingType)
        {
            var query = from ne in _nbcContext.NormativeElements
                        orderby ne.HierarchyId
                        where ne.BuildingTypeId == idBuildingType
                        select new NormativeElement(ne.Id)
                        {
                            BuildingTypeId = ne.BuildingTypeId,
                            Title = ne.Title,
                            Content = ne.Content,
                            HierarchyId = ne.HierarchyId,
                            IsActive = ne.IsActive,
                            Order = ne.Order
                        };

            var elements = await query.ToListAsync();
            return elements;
        }

        public async Task<NormativeElementDto> GetNormativeElement(int id)
        {
            var normativeElement = _nbcContext.NormativeElements.Find(id) ??
                          throw new NotFoundException($"Normative Element with id={id} was not found");

            var list = await _nbcContext.NormativeElements
                .Where(x => x.HierarchyId.IsDescendantOf(normativeElement.HierarchyId))
                .OrderBy(a => a.HierarchyId)
                .ToListAsync();

            return MakeTree(list);
        }

        // Realized through the tears (Natu Daniel) and sweat (Alexandru Sabasanu) for the user

        public async Task<NormativeElement> Insert(TransferNormativeElementDto dto)
        {
            NormativeElement parent = null;
            if (dto.ParentId > 0)
            {
                parent = await _nbcContext.NormativeElements.FindAsync(dto.ParentId) ??
                         throw new NotFoundException($"Normative with id={dto.ParentId} was not found");
            }

            var parentHierarchyId = parent?.HierarchyId ?? HierarchyId.GetRoot();

            var childrenList = await _nbcContext.NormativeElements
                .Where(x => x.HierarchyId.IsDescendantOf(parentHierarchyId) && x.HierarchyId.GetLevel() == parentHierarchyId.GetLevel() + 1)
                .OrderBy(a => a.HierarchyId)
                .Select(x => new {x.HierarchyId})
                .ToListAsync();

            var newNormativeElement = new NormativeElement
            {
                Title = dto.Title,
                Content = dto.Content,
                IsActive = dto.IsActive,
                BuildingTypeId = dto.BuildingTypeId,
                HierarchyId = parentHierarchyId.GetDescendant(childrenList.LastOrDefault()?.HierarchyId, null)
            };

            _nbcContext.NormativeElements.Add(newNormativeElement);
            await _nbcContext.SaveChangesAsync();
            return newNormativeElement;
        }

        public async Task<NormativeElement> Update(int id, TransferNormativeElementDto dto)
        {
            var normativeElement = await _nbcContext.NormativeElements.FindAsync(id) ??
                         throw new NotFoundException($"Normative with id={id} was not found");

            normativeElement.Title = dto.Title;
            normativeElement.Content = dto.Content;
            normativeElement.IsActive = dto.IsActive;
            normativeElement.BuildingTypeId = dto.BuildingTypeId;

            await _nbcContext.SaveChangesAsync();
            return normativeElement;
        }

        public async Task Delete(int id)
        {
            var normative = _nbcContext.Find<NormativeElement>(id)
                ?? throw new NotFoundException(
                    $"Normative with id= {id} was not found");

            _nbcContext.NormativeElements.Remove(normative);
            await _nbcContext.SaveChangesAsync();
        }

        private static NormativeElementDto MakeTree(List<NormativeElement> list)
        {
            NormativeElementDto root = Map(list[0]);
            Stack<NormativeElementDto> stack = new Stack<NormativeElementDto>();
            NormativeElementDto current = root;

            for (int i = 1; i < list.Count; i++)
            {
                var art = list[i];
                var artDto = Map(list[i]);

                if (art.HierarchyId.GetLevel() > current.Level)
                    stack.Push(current);

                if (art.HierarchyId.GetLevel() < current.Level)
                    while (stack.Peek().Level >= art.HierarchyId.GetLevel())
                        stack.Pop();

                var parent = stack.Peek();
                parent.Children.Add(artDto);
                current = artDto;
            }

            return root;
        }

        private static NormativeElementDto Map(NormativeElement normativeElement) =>
            new()
            {
                Id = normativeElement.Id,
                HierarchyId = normativeElement.HierarchyId,
                Title = normativeElement.Title,
                Content = normativeElement.Content,
                Level = normativeElement.HierarchyId.GetLevel(),
                IsActive = normativeElement.IsActive,
                Order = normativeElement.Order,
                BuildingType = normativeElement.BuildingType,
                BuildingTypeId = normativeElement.BuildingTypeId,
            };
    }
}