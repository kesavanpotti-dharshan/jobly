using Jobly.Core.Common;
using Jobly.Core.Enums;

namespace Jobly.Core.Entities;

public class ApplicationStage : BaseEntity
{
    public Guid ApplicationId { get; set; }
    public string StageName { get; set; } = string.Empty;
    public StageType StageType { get; set; } = StageType.Other;
    public DateTime? ScheduledAt { get; set; }
    public StageOutcome? Outcome { get; set; }
    public string? Notes { get; set; }

    public JobApplication Application { get; set; } = null!;
}