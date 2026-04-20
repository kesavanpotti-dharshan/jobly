using MediatR;

namespace Jobly.Application.Features.Stages.Commands.Delete;

public record DeleteStageCommand(Guid Id, Guid ApplicationId) : IRequest;