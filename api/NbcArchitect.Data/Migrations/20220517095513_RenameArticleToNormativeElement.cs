using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class RenameArticleToNormativeElement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.CreateTable(
                name: "NormativeElements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    BuildingTypeId = table.Column<int>(type: "int", nullable: true),
                    Order = table.Column<int>(type: "int", nullable: true),
                    HierarchyId = table.Column<HierarchyId>(type: "hierarchyid", nullable: false),
                    NormativeElementId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NormativeElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NormativeElements_BuildingTypes_BuildingTypeId",
                        column: x => x.BuildingTypeId,
                        principalTable: "BuildingTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NormativeElements_NormativeElements_NormativeElementId",
                        column: x => x.NormativeElementId,
                        principalTable: "NormativeElements",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_NormativeElements_BuildingTypeId",
                table: "NormativeElements",
                column: "BuildingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_NormativeElements_HierarchyId",
                table: "NormativeElements",
                column: "HierarchyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NormativeElements_NormativeElementId",
                table: "NormativeElements",
                column: "NormativeElementId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NormativeElements");

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HierarchyId = table.Column<HierarchyId>(type: "hierarchyid", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_HierarchyId",
                table: "Articles",
                column: "HierarchyId",
                unique: true);
        }
    }
}
