using Jobly.Core.Enums;

namespace Jobly.Application.Features.Applications.DTOs;

public record JobApplicationDto(
    Guid Id,
    string CompanyName,
    string RoleTitle,
    string? JobUrl,
    string Status,
    string? Location,
    string WorkMode,
    decimal? SalaryMin,
    decimal? SalaryMax,
    DateOnly? AppliedDate,
    DateOnly? DeadlineDate,
    int Priority,
    DateTime CreatedAt,
    DateTime UpdatedAt
);