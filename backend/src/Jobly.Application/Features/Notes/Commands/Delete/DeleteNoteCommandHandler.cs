using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Delete;

public class DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DeleteNoteCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        DeleteNoteCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var note = application.Notes
            .FirstOrDefault(n => n.Id == request.Id)
            ?? throw new NotFoundException(nameof(Note), request.Id);

        _unitOfWork.Notes.Remove(note);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}