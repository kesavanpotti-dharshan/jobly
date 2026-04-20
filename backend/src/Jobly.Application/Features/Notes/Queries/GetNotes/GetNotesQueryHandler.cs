using Jobly.Application.Common.Exceptions;
using Jobly.Application.Features.Notes.DTOs;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Notes.Queries.GetNotes;

public class GetNotesQueryHandler : IRequestHandler<GetNotesQuery, List<NoteDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetNotesQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<List<NoteDto>> Handle(
        GetNotesQuery request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        return application.Notes.Select(n => new NoteDto(
            n.Id,
            n.ApplicationId,
            n.Body,
            n.CreatedAt,
            n.UpdatedAt
        )).ToList();
    }
}