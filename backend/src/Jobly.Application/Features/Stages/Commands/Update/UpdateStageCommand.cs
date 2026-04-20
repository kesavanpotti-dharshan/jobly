using Jobly.Core.Enums;
using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Update;

public record UpdateStageCommand(
    Guid Id,
    Guid ApplicationId,
    string StageName,
    StageType StageType,
    DateTime? ScheduledAt,
    StageOutcome? Outcome,
    string? Notes
) : IRequest;