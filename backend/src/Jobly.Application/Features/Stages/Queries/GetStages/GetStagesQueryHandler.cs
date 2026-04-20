using Jobly.Application.Common.Exceptions;
using Jobly.Application.Features.Stages.DTOs;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Stages.Queries.GetStages;

public class GetStagesQueryHandler : IRequestHandler<GetStagesQuery, List<ApplicationStageDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetStagesQueryHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<List<ApplicationStageDto>> Handle(
        GetStagesQuery request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        return application.Stages.Select(s => new ApplicationStageDto(
            s.Id,
            s.ApplicationId,
            s.StageName,
            s.StageType.ToString(),
            s.ScheduledAt,
            s.Outcome?.ToString(),
            s.Notes,
            s.CreatedAt
        )).ToList();
    }
}