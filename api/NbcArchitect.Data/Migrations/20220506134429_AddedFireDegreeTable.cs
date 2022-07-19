using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class AddedFireDegreeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degree",
                table: "FireResistances");

            migrationBuilder.AddColumn<int>(
                name: "DegreeId",
                table: "FireResistances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FireDegrees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FireDegrees", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FireResistances_DegreeId",
                table: "FireResistances",
                column: "DegreeId");

            migrationBuilder.CreateIndex(
                name: "IX_FireDegrees_Name",
                table: "FireDegrees",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FireResistances_FireDegrees_DegreeId",
                table: "FireResistances",
                column: "DegreeId",
                principalTable: "FireDegrees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FireResistances_FireDegrees_DegreeId",
                table: "FireResistances");

            migrationBuilder.DropTable(
                name: "FireDegrees");

            migrationBuilder.DropIndex(
                name: "IX_FireResistances_DegreeId",
                table: "FireResistances");

            migrationBuilder.DropColumn(
                name: "DegreeId",
                table: "FireResistances");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "FireResistances",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
