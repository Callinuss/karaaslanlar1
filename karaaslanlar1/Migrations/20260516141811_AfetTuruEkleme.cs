using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace karaaslanlar1.Migrations
{
    /// <inheritdoc />
    public partial class AfetTuruEkleme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Turu",
                table: "Talepler",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Turu",
                table: "Talepler");
        }
    }
}
