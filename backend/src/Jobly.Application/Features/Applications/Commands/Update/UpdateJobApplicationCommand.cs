using Jobly.Core.Enums;
using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Update;

public record UpdateJobApplicationCommand(
    Guid Id,
    string CompanyName,
    string RoleTitle,
    string? JobUrl,
    ApplicationStatus Status,
    string? Location,
    WorkMode WorkMode,
    decimal? SalaryMin,
    decimal? SalaryMax,
    DateOnly? AppliedDate,
    DateOnly? DeadlineDate,
    int Priority
) : IRequest;