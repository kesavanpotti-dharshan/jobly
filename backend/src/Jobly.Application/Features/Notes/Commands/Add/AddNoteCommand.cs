using MediatR;

namespace Jobly.Application.Features.Notes.Commands.Add;

public record AddNoteCommand(
    Guid ApplicationId,
    string Body
) : IRequest<Guid>;