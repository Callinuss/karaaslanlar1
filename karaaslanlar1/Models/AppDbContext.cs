using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace karaaslanlar1.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AfetTalebi> Talepler { get; set; }
    }
}