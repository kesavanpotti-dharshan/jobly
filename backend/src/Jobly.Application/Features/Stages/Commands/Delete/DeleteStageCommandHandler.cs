using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Delete;

public class DeleteStageCommandHandler : IRequestHandler<DeleteStageCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DeleteStageCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        DeleteStageCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(
                request.ApplicationId,
                _currentUserService.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.ApplicationId);

        var stage = application.Stages
            .FirstOrDefault(s => s.Id == request.Id)
            ?? throw new NotFoundException(nameof(ApplicationStage), request.Id);

        _unitOfWork.ApplicationStages.Remove(stage);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}