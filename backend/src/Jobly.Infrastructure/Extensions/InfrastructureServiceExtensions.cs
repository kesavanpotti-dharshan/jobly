using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using Jobly.Infrastructure.Persistence;
using Jobly.Infrastructure.Services.Auth;
using Jobly.Infrastructure.Services.Blob;
using Jobly.Infrastructure.Services.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.AspNetCore.Identity;
using Jobly.Core.Entities;

namespace Jobly.Infrastructure.Extensions;

public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<JoblyDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"),
                npgsql => npgsql.MigrationsAssembly(typeof(JoblyDbContext).Assembly.FullName)
            )
        );

        // Unit of Work
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Identity
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

        // Services
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IBlobService, BlobService>();
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // Hangfire
        // services.AddHangfire(config => config
        //     .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
        //     .UseSimpleAssemblyNameTypeSerializer()
        //     .UseRecommendedSerializerSettings()
        //     .UsePostgreSqlStorage(options =>
        //         options.UseNpgsqlConnection(
        //             configuration.GetConnectionString("DefaultConnection")
        //         )
        //     )
        // );
        // services.AddHangfireServer();

        // Redis (optional — comment out until needed)
        // services.AddStackExchangeRedisCache(options =>
        //     options.Configuration = configuration.GetConnectionString("Redis"));

        return services;
    }
}