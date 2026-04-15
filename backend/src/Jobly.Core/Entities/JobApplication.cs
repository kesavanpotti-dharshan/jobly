using Jobly.Core.Common;
using Jobly.Core.Enums;

namespace Jobly.Core.Entities;

public class JobApplication : BaseEntity
{
    public Guid UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string RoleTitle { get; set; } = string.Empty;
    public string? JobUrl { get; set; }
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Saved;
    public string? Location { get; set; }
    public WorkMode WorkMode { get; set; } = WorkMode.OnSite;
    public decimal? SalaryMin { get; set; }
    public decimal? SalaryMax { get; set; }
    public DateOnly? AppliedDate { get; set; }
    public DateOnly? DeadlineDate { get; set; }
    public int Priority { get; set; } = 0;

    public User User { get; set; } = null!;
    public ICollection<ApplicationStage> Stages { get; set; } = [];
    public ICollection<Note> Notes { get; set; } = [];
    public ICollection<Reminder> Reminders { get; set; } = [];
    public ICollection<Document> Documents { get; set; } = [];
}