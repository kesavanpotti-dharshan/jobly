using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Reminders.Commands.Create;

public class CreateReminderCommandHandler : IRequestHandler<CreateReminderCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CreateReminderCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Guid> Handle(
        CreateReminderCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var reminder = new Reminder
        {
            UserId = _currentUserService.UserId,
            ApplicationId = application.Id,
            Message = request.Message,
            RemindAt = request.RemindAt
        };

        await _unitOfWork.Reminders.AddAsync(reminder, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return reminder.Id;
    }
}