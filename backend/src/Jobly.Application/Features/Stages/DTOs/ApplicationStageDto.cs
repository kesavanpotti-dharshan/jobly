namespace Jobly.Application.Features.Stages.DTOs;

public record ApplicationStageDto(
    Guid Id,
    Guid ApplicationId,
    string StageName,
    string StageType,
    DateTime? ScheduledAt,
    string? Outcome,
    string? Notes,
    DateTime CreatedAt
);