using Jobly.Application.Features.Notes.DTOs;
using MediatR;

namespace Jobly.Application.Features.Notes.Queries.GetNotes;

public record GetNotesQuery(Guid ApplicationId) : IRequest<List<NoteDto>>;