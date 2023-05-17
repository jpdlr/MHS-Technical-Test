using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<CustomerRecord> CustomerRecords { get; set; }
        public DbSet<PetRecord> PetRecords { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }
    }
}