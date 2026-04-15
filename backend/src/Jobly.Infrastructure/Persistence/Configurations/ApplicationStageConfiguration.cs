using Jobly.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jobly.Infrastructure.Persistence.Configurations;

public class ApplicationStageConfiguration : IEntityTypeConfiguration<ApplicationStage>
{
    public void Configure(EntityTypeBuilder<ApplicationStage> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.StageName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(s => s.StageType)
            .IsRequired()
            .HasConversion<string>();

        builder.Property(s => s.Outcome)
            .HasConversion<string>();

        builder.Property(s => s.Notes)
            .HasMaxLength(2000);

        builder.HasIndex(s => s.ApplicationId);
    }
}