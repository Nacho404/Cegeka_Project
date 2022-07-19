using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class AddedBuildingMaterialsSubcategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildingMaterialsSubcategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingMaterialsSubcategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingMaterialsSubcategories_BuildingMaterialsCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "BuildingMaterialsCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingMaterialsSubcategories_CategoryId",
                table: "BuildingMaterialsSubcategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_BuildingMaterialsSubcategories_Name",
                table: "BuildingMaterialsSubcategories",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingMaterialsSubcategories");
        }
    }
}
