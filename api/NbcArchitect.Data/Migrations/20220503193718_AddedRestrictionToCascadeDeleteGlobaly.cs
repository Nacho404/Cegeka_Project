using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class AddedRestrictionToCascadeDeleteGlobaly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingMaterials_BuildingMaterialsSubcategories_SubcategoryId",
                table: "BuildingMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_BuildingMaterialsSubcategories_BuildingMaterialsCategories_CategoryId",
                table: "BuildingMaterialsSubcategories");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingMaterials_BuildingMaterialsSubcategories_SubcategoryId",
                table: "BuildingMaterials",
                column: "SubcategoryId",
                principalTable: "BuildingMaterialsSubcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingMaterialsSubcategories_BuildingMaterialsCategories_CategoryId",
                table: "BuildingMaterialsSubcategories",
                column: "CategoryId",
                principalTable: "BuildingMaterialsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingMaterials_BuildingMaterialsSubcategories_SubcategoryId",
                table: "BuildingMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_BuildingMaterialsSubcategories_BuildingMaterialsCategories_CategoryId",
                table: "BuildingMaterialsSubcategories");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingMaterials_BuildingMaterialsSubcategories_SubcategoryId",
                table: "BuildingMaterials",
                column: "SubcategoryId",
                principalTable: "BuildingMaterialsSubcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingMaterialsSubcategories_BuildingMaterialsCategories_CategoryId",
                table: "BuildingMaterialsSubcategories",
                column: "CategoryId",
                principalTable: "BuildingMaterialsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
