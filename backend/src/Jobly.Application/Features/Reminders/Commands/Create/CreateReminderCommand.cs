using MediatR;

namespace Jobly.Application.Features.Reminders.Commands.Create;

public record CreateReminderCommand(
    Guid ApplicationId,
    string Message,
    DateTime RemindAt
) : IRequest<Guid>;