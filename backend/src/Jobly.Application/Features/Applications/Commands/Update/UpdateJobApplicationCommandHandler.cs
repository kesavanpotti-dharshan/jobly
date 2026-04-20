using Jobly.Application.Common.Exceptions;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using Jobly.Core.Entities;
using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Update;

public class UpdateJobApplicationCommandHandler
    : IRequestHandler<UpdateJobApplicationCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public UpdateJobApplicationCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        UpdateJobApplicationCommand request,
        CancellationToken cancellationToken)
    {
        var application = await _unitOfWork.JobApplications
            .GetByIdWithDetailsAsync(request.Id, _currentUserService.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(JobApplication), request.Id);

        application.CompanyName = request.CompanyName;
        application.RoleTitle = request.RoleTitle;
        application.JobUrl = request.JobUrl;
        application.Status = request.Status;
        application.Location = request.Location;
        application.WorkMode = request.WorkMode;
        application.SalaryMin = request.SalaryMin;
        application.SalaryMax = request.SalaryMax;
        application.AppliedDate = request.AppliedDate;
        application.DeadlineDate = request.DeadlineDate;
        application.Priority = request.Priority;

        _unitOfWork.JobApplications.Update(application);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}