using Jobly.Core.Common;

namespace Jobly.Core.Entities;

public class Reminder : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid ApplicationId { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime RemindAt { get; set; }
    public bool IsSent { get; set; }
    public bool IsDismissed { get; set; }

    public User User { get; set; } = null!;
    public JobApplication Application { get; set; } = null!;
}