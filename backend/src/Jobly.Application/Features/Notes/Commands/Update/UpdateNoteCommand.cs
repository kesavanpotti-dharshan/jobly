using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Update;

public record UpdateNoteCommand(
    Guid Id,
    Guid ApplicationId,
    string Body
) : IRequest;