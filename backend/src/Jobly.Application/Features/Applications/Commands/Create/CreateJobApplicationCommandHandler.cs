using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Create;

public class CreateJobApplicationCommandHandler
    : IRequestHandler<CreateJobApplicationCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CreateJobApplicationCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Guid> Handle(
        CreateJobApplicationCommand request,
        CancellationToken cancellationToken)
    {
        var application = new JobApplication
        {
            UserId = _currentUserService.UserId,
            CompanyName = request.CompanyName,
            RoleTitle = request.RoleTitle,
            JobUrl = request.JobUrl,
            Location = request.Location,
            WorkMode = request.WorkMode,
            SalaryMin = request.SalaryMin,
            SalaryMax = request.SalaryMax,
            AppliedDate = request.AppliedDate,
            DeadlineDate = request.DeadlineDate,
            Priority = request.Priority
        };

        await _unitOfWork.JobApplications.AddAsync(application, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return application.Id;
    }
}