using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class AddedBuildingMaterial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildingMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    SubcategoryId = table.Column<int>(type: "int", nullable: false),
                    Hui = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingMaterials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingMaterials_BuildingMaterialsSubcategories_SubcategoryId",
                        column: x => x.SubcategoryId,
                        principalTable: "BuildingMaterialsSubcategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingMaterials_Name",
                table: "BuildingMaterials",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BuildingMaterials_SubcategoryId",
                table: "BuildingMaterials",
                column: "SubcategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingMaterials");
        }
    }
}
