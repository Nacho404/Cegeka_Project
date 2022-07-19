using Microsoft.EntityFrameworkCore;
using NbcArchitect.Domain;
using NbcArchitect.Domain.Nomenclators;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

namespace NbcArchitect.Data
{
    public class NbcContext : IdentityDbContext<User>
    {
        public NbcContext()
        {
        }

        public NbcContext(DbContextOptions<NbcContext> context)
            : base(context)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<NormativeElement> NormativeElements { get; set; }
        public DbSet<BuildingType> BuildingTypes { get; set; }
        public DbSet<BuildingMaterial> BuildingMaterials { get; set; }
        public DbSet<BuildingMaterialsCategory> BuildingMaterialsCategories { get; set; }
        public DbSet<BuildingMaterialsSubcategory> BuildingMaterialsSubcategories { get; set; }
        public DbSet<BuildingElementsType> BuildingElementsTypes { get; set; }
        public DbSet<FireResistance> FireResistances { get; set; }
        public DbSet<FireResistanceDegree> FireDegrees { get; set; }

        public DbSet<UserToken> UserTokens { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<NormativeElement>(e =>
            {
                e.Navigation(a => a.BuildingType).AutoInclude();
                e.Property(a => a.HierarchyId).IsRequired();
                e.HasIndex(a => a.HierarchyId).IsUnique();
            });

            modelBuilder.Entity<BuildingType>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
            });

            modelBuilder.Entity<BuildingMaterialsCategory>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<BuildingMaterialsSubcategory>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<BuildingMaterial>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<BuildingElementsType>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
            });
            modelBuilder.Entity<FireResistanceDegree>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(5).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
            });
            modelBuilder.Entity<Project>(e =>
            {
                e.Property(e => e.Name).HasMaxLength(255).IsRequired();
                e.HasIndex(e => e.Name).IsUnique();
                e.HasMany(p => p.BuildingMaterials)
                     .WithMany(p => p.Projects)
                     .UsingEntity<Dictionary<string, object>>(
                         "ProjectBuildingMaterials",
                         j => j
                             .HasOne<BuildingMaterial>()
                             .WithMany()
                             .HasForeignKey("BuildingMaterialId")
                             .HasConstraintName("FK_ProjectBuildingMaterial_BuildingMaterials_BuildingMaterialId")
                             .OnDelete(DeleteBehavior.Restrict),
                         j => j
                             .HasOne<Project>()
                             .WithMany()
                             .HasForeignKey("ProjectId")
                             .HasConstraintName("FK_ProjectBuildingMaterial_Projects_ProjectId")
                             .OnDelete(DeleteBehavior.Cascade));
            });

            modelBuilder.Entity<UserToken>(e =>
            {
                e.Property((e => e.Token)).IsRequired();
            });
        }
    }
}