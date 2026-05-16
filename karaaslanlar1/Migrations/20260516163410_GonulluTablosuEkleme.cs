using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace karaaslanlar1.Migrations
{
    /// <inheritdoc />
    public partial class GonulluTablosuEkleme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GonulluBasvurulari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdSoyad = table.Column<string>(type: "TEXT", nullable: false),
                    Telefon = table.Column<string>(type: "TEXT", nullable: false),
                    UzmanlikAlani = table.Column<string>(type: "TEXT", nullable: false),
                    BasvuruTarihi = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GonulluBasvurulari", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GonulluBasvurulari");
        }
    }
}
