using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NbcArchitect.Data.Migrations
{
    public partial class PopulateFireDegree : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO FireDegrees(Name) VALUES ('I')" +
                "INSERT INTO FireDegrees(Name) VALUES ('II')" +
                "INSERT INTO FireDegrees(Name) VALUES ('III')" +
                "INSERT INTO FireDegrees(Name) VALUES ('IV')" +
                "INSERT INTO FireDegrees(Name) VALUES ('V')" +
                "INSERT INTO FireDegrees(Name) VALUES ('VI')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
