using Jobly.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jobly.Infrastructure.Persistence.Configurations;

public class ReminderConfiguration : IEntityTypeConfiguration<Reminder>
{
    public void Configure(EntityTypeBuilder<Reminder> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Message)
            .IsRequired()
            .HasMaxLength(500);

        // Index both for Hangfire polling and per-user queries
        builder.HasIndex(r => r.UserId);
        builder.HasIndex(r => new { r.IsSent, r.RemindAt });
    }
}