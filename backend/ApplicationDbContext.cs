using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<CustomerRecord> CustomerRecords { get; set; } = null!;
        public DbSet<PetRecord> PetRecords { get; set; } = null!;
        public DbSet<GroomerRecord> GroomerRecords { get; set; } = null!;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }
    }
}