using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Add;

public class AddNoteCommandHandler : IRequestHandler<AddNoteCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AddNoteCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Guid> Handle(
        AddNoteCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var note = new Note
        {
            ApplicationId = application.Id,
            Body = request.Body
        };

        await _unitOfWork.Notes.AddAsync(note, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return note.Id;
    }
}