using Jobly.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jobly.Infrastructure.Persistence.Configurations;

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.FileName)
            .IsRequired()
            .HasMaxLength(300);

        builder.Property(d => d.BlobUrl)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(d => d.DocumentType)
            .IsRequired()
            .HasConversion<string>();

        builder.HasIndex(d => d.UserId);
    }
}