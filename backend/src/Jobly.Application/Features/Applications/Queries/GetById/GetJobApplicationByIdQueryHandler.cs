using Jobly.Application.Common.Exceptions;
using Jobly.Application.Features.Applications.DTOs;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Applications.Queries.GetById;

public class GetJobApplicationByIdQueryHandler
    : IRequestHandler<GetJobApplicationByIdQuery, JobApplicationDetailDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetJobApplicationByIdQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<JobApplicationDetailDto> Handle(
        GetJobApplicationByIdQuery request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(request.Id, _currentUserService.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.Id);

        return new JobApplicationDetailDto(
            application.Id,
            application.CompanyName,
            application.RoleTitle,
            application.JobUrl,
            application.Status.ToString(),
            application.Location,
            application.WorkMode.ToString(),
            application.SalaryMin,
            application.SalaryMax,
            application.AppliedDate,
            application.DeadlineDate,
            application.Priority,
            application.CreatedAt,
            application.UpdatedAt,
            application.Stages.Select(s => new StageDto(
                s.Id,
                s.StageName,
                s.StageType.ToString(),
                s.ScheduledAt,
                s.Outcome?.ToString(),
                s.Notes
            )).ToList(),
            application.Notes.Select(n => new NoteDto(
                n.Id,
                n.Body,
                n.CreatedAt,
                n.UpdatedAt
            )).ToList()
        );
    }
}