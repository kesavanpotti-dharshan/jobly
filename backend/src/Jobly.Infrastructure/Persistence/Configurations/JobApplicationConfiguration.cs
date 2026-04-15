using Jobly.Core.Entities;
using Jobly.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jobly.Infrastructure.Persistence.Configurations;

public class JobApplicationConfiguration : IEntityTypeConfiguration<JobApplication>
{
    public void Configure(EntityTypeBuilder<JobApplication> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.CompanyName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(a => a.RoleTitle)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(a => a.JobUrl)
            .HasMaxLength(1000);

        builder.Property(a => a.Status)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(a => a.WorkMode)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(a => a.Location)
            .HasMaxLength(200);

        builder.Property(a => a.SalaryMin)
            .HasColumnType("decimal(18,2)");

        builder.Property(a => a.SalaryMax)
            .HasColumnType("decimal(18,2)");

        // Index for fast per-user queries
        builder.HasIndex(a => a.UserId);
        builder.HasIndex(a => new { a.UserId, a.Status });

        builder.HasMany(a => a.Stages)
            .WithOne(s => s.Application)
            .HasForeignKey(s => s.ApplicationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.Notes)
            .WithOne(n => n.Application)
            .HasForeignKey(n => n.ApplicationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.Reminders)
            .WithOne(r => r.Application)
            .HasForeignKey(r => r.ApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(a => a.Documents)
            .WithOne(d => d.Application)
            .HasForeignKey(d => d.ApplicationId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}