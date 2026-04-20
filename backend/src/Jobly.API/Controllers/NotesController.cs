using Jobly.Application.Features.Notes.Commands.Add;
using Jobly.Application.Features.Notes.Commands.Delete;
using Jobly.Application.Features.Notes.Commands.Update;
using Jobly.Application.Features.Notes.Queries.GetNotes;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jobly.API.Controllers;

[ApiController]
[Authorize]
[Route("api/applications/{applicationId:guid}/notes")]
public class NotesController : ControllerBase
{
    private readonly IMediator _mediator;

    public NotesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetNotesQuery(applicationId), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Add(
        Guid applicationId,
        [FromBody] AddNoteCommand command,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(
            command with { ApplicationId = applicationId }, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { applicationId }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid applicationId,
        Guid id,
        [FromBody] UpdateNoteCommand command,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(
            command with { Id = id, ApplicationId = applicationId }, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid applicationId,
        Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(
            new DeleteNoteCommand(id, applicationId), cancellationToken);
        return NoContent();
    }
}