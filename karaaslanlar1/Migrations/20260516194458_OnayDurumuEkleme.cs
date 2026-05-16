using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace karaaslanlar1.Migrations
{
    /// <inheritdoc />
    public partial class OnayDurumuEkleme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "GonulluBasvurulari",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "GonulluBasvurulari");
        }
    }
}
