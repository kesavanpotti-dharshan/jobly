using MediatR;

namespace Jobly.Application.Features.Applications.Commands.Delete;

public record DeleteJobApplicationCommand(Guid Id) : IRequest;