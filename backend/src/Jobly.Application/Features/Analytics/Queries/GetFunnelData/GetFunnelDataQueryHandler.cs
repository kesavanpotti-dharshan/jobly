using Jobly.Application.Features.Analytics.DTOs;
using Jobly.Core.Enums;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Analytics.Queries.GetFunnelData;

public class GetFunnelDataQueryHandler
    : IRequestHandler<GetFunnelDataQuery, FunnelDataDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetFunnelDataQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<FunnelDataDto> Handle(
        GetFunnelDataQuery request,
        CancellationToken cancellationToken)
    {
        var applications = await _unitOfWork.JobApplications
            .GetByUserIdAsync(_currentUserService.UserId, cancellationToken);

        var appList = applications.ToList();

        int Count(ApplicationStatus status) =>
            appList.Count(a => a.Status == status);

        return new FunnelDataDto(
            Count(ApplicationStatus.Saved),
            Count(ApplicationStatus.Applied),
            Count(ApplicationStatus.PhoneScreen),
            Count(ApplicationStatus.Interview),
            Count(ApplicationStatus.TechnicalAssessment),
            Count(ApplicationStatus.Offer),
            Count(ApplicationStatus.Rejected),
            Count(ApplicationStatus.Withdrawn)
        );
    }
}