using Jobly.Core.Common;
using Jobly.Core.Enums;

namespace Jobly.Core.Entities;

public class Document : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid? ApplicationId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string BlobUrl { get; set; } = string.Empty;
    public DocumentType DocumentType { get; set; } = DocumentType.Other;

    public User User { get; set; } = null!;
    public JobApplication? Application { get; set; }
}