using MediatR;

namespace Jobly.Application.Features.Reminders.Commands.Dismiss;

public record DismissReminderCommand(Guid Id) : IRequest;