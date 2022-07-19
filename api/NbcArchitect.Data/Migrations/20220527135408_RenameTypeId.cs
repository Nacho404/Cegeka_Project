using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class RenameTypeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_BuildingTypes_TypeId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Projects",
                newName: "BuildingTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_TypeId",
                table: "Projects",
                newName: "IX_Projects_BuildingTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_BuildingTypes_BuildingTypeId",
                table: "Projects",
                column: "BuildingTypeId",
                principalTable: "BuildingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_BuildingTypes_BuildingTypeId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "BuildingTypeId",
                table: "Projects",
                newName: "TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_BuildingTypeId",
                table: "Projects",
                newName: "IX_Projects_TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_BuildingTypes_TypeId",
                table: "Projects",
                column: "TypeId",
                principalTable: "BuildingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
