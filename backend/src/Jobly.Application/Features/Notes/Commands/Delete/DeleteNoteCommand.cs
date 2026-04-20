using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Delete;

public record DeleteNoteCommand(Guid Id, Guid ApplicationId) : IRequest;