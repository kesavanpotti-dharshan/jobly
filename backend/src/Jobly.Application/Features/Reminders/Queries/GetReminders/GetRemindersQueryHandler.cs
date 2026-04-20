using Jobly.Application.Features.Reminders.DTOs;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Reminders.Queries.GetReminders;

public class GetRemindersQueryHandler : IRequestHandler<GetRemindersQuery, List<ReminderDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetRemindersQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<List<ReminderDto>> Handle(
        GetRemindersQuery request,
        CancellationToken cancellationToken)
    {
        var reminders = await _unitOfWork.Reminders
            .GetByUserIdAsync(_currentUserService.UserId, cancellationToken);

        return reminders.Select(r => new ReminderDto(
            r.Id,
            r.ApplicationId,
            r.Application.CompanyName,
            r.Application.RoleTitle,
            r.Message,
            r.RemindAt,
            r.IsSent,
            r.IsDismissed,
            r.CreatedAt
        )).ToList();
    }
}