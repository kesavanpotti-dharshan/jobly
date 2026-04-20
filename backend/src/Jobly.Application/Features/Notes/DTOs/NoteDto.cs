namespace Jobly.Application.Features.Notes.DTOs;

public record NoteDto(
    Guid Id,
    Guid ApplicationId,
    string Body,
    DateTime CreatedAt,
    DateTime UpdatedAt
);