using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class RenameBuildingElementAndResistanceDegree : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FireResistances_BuildingElementsTypes_ElementId",
                table: "FireResistances");

            migrationBuilder.DropForeignKey(
                name: "FK_FireResistances_FireDegrees_DegreeId",
                table: "FireResistances");

            migrationBuilder.RenameColumn(
                name: "ElementId",
                table: "FireResistances",
                newName: "FireResistanceDegreeId");

            migrationBuilder.RenameColumn(
                name: "DegreeId",
                table: "FireResistances",
                newName: "BuildingElementTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_FireResistances_ElementId",
                table: "FireResistances",
                newName: "IX_FireResistances_FireResistanceDegreeId");

            migrationBuilder.RenameIndex(
                name: "IX_FireResistances_DegreeId",
                table: "FireResistances",
                newName: "IX_FireResistances_BuildingElementTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_FireResistances_BuildingElementsTypes_BuildingElementTypeId",
                table: "FireResistances",
                column: "BuildingElementTypeId",
                principalTable: "BuildingElementsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FireResistances_FireDegrees_FireResistanceDegreeId",
                table: "FireResistances",
                column: "FireResistanceDegreeId",
                principalTable: "FireDegrees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FireResistances_BuildingElementsTypes_BuildingElementTypeId",
                table: "FireResistances");

            migrationBuilder.DropForeignKey(
                name: "FK_FireResistances_FireDegrees_FireResistanceDegreeId",
                table: "FireResistances");

            migrationBuilder.RenameColumn(
                name: "FireResistanceDegreeId",
                table: "FireResistances",
                newName: "ElementId");

            migrationBuilder.RenameColumn(
                name: "BuildingElementTypeId",
                table: "FireResistances",
                newName: "DegreeId");

            migrationBuilder.RenameIndex(
                name: "IX_FireResistances_FireResistanceDegreeId",
                table: "FireResistances",
                newName: "IX_FireResistances_ElementId");

            migrationBuilder.RenameIndex(
                name: "IX_FireResistances_BuildingElementTypeId",
                table: "FireResistances",
                newName: "IX_FireResistances_DegreeId");

            migrationBuilder.AddForeignKey(
                name: "FK_FireResistances_BuildingElementsTypes_ElementId",
                table: "FireResistances",
                column: "ElementId",
                principalTable: "BuildingElementsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FireResistances_FireDegrees_DegreeId",
                table: "FireResistances",
                column: "DegreeId",
                principalTable: "FireDegrees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
