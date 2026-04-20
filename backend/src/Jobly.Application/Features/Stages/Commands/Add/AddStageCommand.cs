using Jobly.Core.Enums;
using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Add;

public record AddStageCommand(
    Guid ApplicationId,
    string StageName,
    StageType StageType,
    DateTime? ScheduledAt,
    string? Notes
) : IRequest<Guid>;