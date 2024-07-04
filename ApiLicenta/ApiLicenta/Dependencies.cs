using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Repository;
using ApiLicenta.DataLayer.Services;
using ApiLicenta.DataLayer.Repositories;

namespace ApiLicenta;

public class Dependencies
{
    public static void Inject(WebApplicationBuilder app)
    {
        app.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(app.Configuration.GetConnectionString("DefaultConnection"),
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        });

        app.Services.AddCors(options =>
        {
            options.AddPolicy("Access-Control-Allow-Origin",
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
        });

        AddRepositories(app.Services);
        AddServices(app.Services);
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<UserRepository>();
        services.AddScoped<ProductRepository>();
        services.AddScoped<OrderRepository>();
        services.AddScoped<ExerciseRepository>();
        services.AddScoped<WorkoutRepository>();
        services.AddScoped<UnitOfWork>();
    }

    private static void AddServices(IServiceCollection services)
    {
        services.AddScoped<UserService>();
        services.AddScoped<OrderService>();
        services.AddScoped<ProductService>();
        services.AddScoped<ExerciseService>();
        services.AddScoped<WorkoutService>();
    }
}
