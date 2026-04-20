using System.Text;
using Hangfire;
using Jobly.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using AspNet.Security.OAuth.GitHub;
using Serilog;
using Jobly.Application.Extensions;
using Jobly.API.Middleware;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// ── Serilog ──────────────────────────────────────────
builder.Host.UseSerilog((ctx, config) =>
    config.ReadFrom.Configuration(ctx.Configuration));

// ── Controllers ──────────────────────────────────────
builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// ── Infrastructure (DB, UoW, Services, Hangfire) ─────
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

// ── JWT Authentication ────────────────────────────────
var authBuilder = builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
        ClockSkew = TimeSpan.Zero
    };
});

// Only register OAuth providers if credentials are configured
if (!string.IsNullOrWhiteSpace(builder.Configuration["OAuth:Google:ClientId"]))
{
    authBuilder.AddGoogle(options =>
    {
        options.ClientId = builder.Configuration["OAuth:Google:ClientId"]!;
        options.ClientSecret = builder.Configuration["OAuth:Google:ClientSecret"]!;
    });
}

if (!string.IsNullOrWhiteSpace(builder.Configuration["OAuth:GitHub:ClientId"]))
{
    authBuilder.AddGitHub(options =>
    {
        options.ClientId = builder.Configuration["OAuth:GitHub:ClientId"]!;
        options.ClientSecret = builder.Configuration["OAuth:GitHub:ClientSecret"]!;
        options.Scope.Add("user:email");
    });
}

// ── Authorisation ─────────────────────────────────────
builder.Services.AddAuthorization();

// ── CORS ──────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("JoblyClient", policy =>
        policy.WithOrigins(
                builder.Configuration["App:ClientUrl"]!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

// ── Middleware pipeline ───────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Title = "Jobly API";
        options.WithHttpBearerAuthentication(bearer =>
        {
            bearer.Token = "your-super-secret-dev-key-min-32-characters-long";
        });
    });
}

app.UseSerilogRequestLogging();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors("JoblyClient");
app.UseAuthentication();
app.UseAuthorization();
// app.UseHangfireDashboard("/hangfire");
app.MapControllers();

app.Run();