namespace Jobly.Application.Features.Applications.DTOs;

public record JobApplicationDetailDto(
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
    DateTime UpdatedAt,
    List<StageDto> Stages,
    List<NoteDto> Notes
);

public record StageDto(
    Guid Id,
    string StageName,
    string StageType,
    DateTime? ScheduledAt,
    string? Outcome,
    string? Notes
);

public record NoteDto(
    Guid Id,
    string Body,
    DateTime CreatedAt,
    DateTime UpdatedAt
);