using MediatR;

namespace Jobly.Application.Features.Reminders.Commands.Delete;

public record DeleteReminderCommand(Guid Id) : IRequest;