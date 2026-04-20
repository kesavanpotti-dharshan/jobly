using Jobly.Application.Features.Reminders.DTOs;
using MediatR;

namespace Jobly.Application.Features.Reminders.Queries.GetReminders;

public record GetRemindersQuery : IRequest<List<ReminderDto>>;