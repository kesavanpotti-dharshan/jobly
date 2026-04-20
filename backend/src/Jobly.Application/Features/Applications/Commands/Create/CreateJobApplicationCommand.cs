using Jobly.Core.Enums;
using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Create;

public record CreateJobApplicationCommand(
    string CompanyName,
    string RoleTitle,
    string? JobUrl,
    string? Location,
    WorkMode WorkMode,
    decimal? SalaryMin,
    decimal? SalaryMax,
    DateOnly? AppliedDate,
    DateOnly? DeadlineDate,
    int Priority
) : IRequest<Guid>;