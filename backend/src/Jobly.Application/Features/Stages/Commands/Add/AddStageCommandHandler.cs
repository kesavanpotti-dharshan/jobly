using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Add;

public class AddStageCommandHandler : IRequestHandler<AddStageCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AddStageCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Guid> Handle(
        AddStageCommand request,
        CancellationToken cancellationToken)
    {
        // Verify the application belongs to current user
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var stage = new ApplicationStage
        {
            ApplicationId = application.Id,
            StageName = request.StageName,
            StageType = request.StageType,
            ScheduledAt = request.ScheduledAt,
            Notes = request.Notes
        };

        await _unitOfWork.ApplicationStages.AddAsync(stage, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return stage.Id;
    }
}