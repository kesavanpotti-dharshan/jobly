namespace Jobly.Application.Features.Reminders.DTOs;

public record ReminderDto(
    Guid Id,
    Guid ApplicationId,
    string CompanyName,
    string RoleTitle,
    string Message,
    DateTime RemindAt,
    bool IsSent,
    bool IsDismissed,
    DateTime CreatedAt
);