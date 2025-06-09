using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Repository.Data.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
             
            var userTypeConverter = new EnumToStringConverter<UserType>();
            builder.Entity<AppUser>()
                   .Property(u => u.UserType)
                   .HasConversion(userTypeConverter)
                   .HasMaxLength(20);
             
            builder.Entity<Address>().ToTable("Addresses");
        }
    }
}