using ApiLicenta.DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiLicenta.DataLayer.DatabaseConnection
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutItem> WorkoutItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderItem>()
                .HasOne<Order>()
                .WithMany(o => o.Items)
                .HasForeignKey(o => o.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutItem>()
                .HasOne<Workout>()
                .WithMany(w => w.Items)
                .HasForeignKey(wi => wi.WorkoutId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
