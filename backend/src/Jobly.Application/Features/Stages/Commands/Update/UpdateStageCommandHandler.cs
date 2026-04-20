using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Update;

public class UpdateStageCommandHandler : IRequestHandler<UpdateStageCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public UpdateStageCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        UpdateStageCommand request,
        CancellationToken cancellationToken)
    {
        // Verify the application belongs to current user
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var stage = application.Stages
            .FirstOrDefault(s => s.Id == request.Id)
            ?? throw new NotFoundException(nameof(ApplicationStage), request.Id);

        stage.StageName = request.StageName;
        stage.StageType = request.StageType;
        stage.ScheduledAt = request.ScheduledAt;
        stage.Outcome = request.Outcome;
        stage.Notes = request.Notes;

        _unitOfWork.ApplicationStages.Update(stage);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}