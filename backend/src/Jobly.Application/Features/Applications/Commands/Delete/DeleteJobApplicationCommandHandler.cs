using Jobly.Application.Common.Exceptions;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Delete;

public class DeleteJobApplicationCommandHandler
    : IRequestHandler<DeleteJobApplicationCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DeleteJobApplicationCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        DeleteJobApplicationCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(request.Id, _currentUserService.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.Id);

        _unitOfWork.JobApplications.Remove(application);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}