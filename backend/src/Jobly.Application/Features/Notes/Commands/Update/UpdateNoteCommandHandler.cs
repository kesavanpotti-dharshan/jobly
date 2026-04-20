using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Update;

public class UpdateNoteCommandHandler : IRequestHandler<UpdateNoteCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public UpdateNoteCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        UpdateNoteCommand request,
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

        note.Body = request.Body;

        _unitOfWork.Notes.Update(note);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}