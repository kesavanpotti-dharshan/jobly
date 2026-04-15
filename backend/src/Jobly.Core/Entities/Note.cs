using Jobly.Core.Common;

namespace Jobly.Core.Entities;

public class Note : BaseEntity
{
    public Guid ApplicationId { get; set; }
    public string Body { get; set; } = string.Empty;

    public JobApplication Application { get; set; } = null!;
}