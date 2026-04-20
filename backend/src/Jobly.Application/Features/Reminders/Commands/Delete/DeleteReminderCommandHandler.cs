using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Reminders.Commands.Delete;

public class DeleteReminderCommandHandler : IRequestHandler<DeleteReminderCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DeleteReminderCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        DeleteReminderCommand request,
        CancellationToken cancellationToken)
    {
        var reminders = await _unitOfWork.Reminders
            .GetByUserIdAsync(_currentUserService.UserId, cancellationToken);

        var reminder = reminders.FirstOrDefault(r => r.Id == request.Id)
            ?? throw new NotFoundException(nameof(Reminder), request.Id);

        _unitOfWork.Reminders.Remove(reminder);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}