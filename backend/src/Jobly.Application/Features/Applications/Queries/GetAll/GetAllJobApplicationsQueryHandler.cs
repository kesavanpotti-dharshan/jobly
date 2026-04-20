using Jobly.Application.Features.Applications.DTOs;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Applications.Queries.GetAll;

public class GetAllJobApplicationsQueryHandler
    : IRequestHandler<GetAllJobApplicationsQuery, List<JobApplicationDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetAllJobApplicationsQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<List<JobApplicationDto>> Handle(
        GetAllJobApplicationsQuery request,
        CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        var applications = request.Status.HasValue
            ? await _unitOfWork.JobApplications
                .GetByStatusAsync(userId, request.Status.Value, cancellationToken)
            : await _unitOfWork.JobApplications
                .GetByUserIdAsync(userId, cancellationToken);

        return applications.Select(a => new JobApplicationDto(
            a.Id,
            a.CompanyName,
            a.RoleTitle,
            a.JobUrl,
            a.Status.ToString(),
            a.Location,
            a.WorkMode.ToString(),
            a.SalaryMin,
            a.SalaryMax,
            a.AppliedDate,
            a.DeadlineDate,
            a.Priority,
            a.CreatedAt,
            a.UpdatedAt
        )).ToList();
    }
}