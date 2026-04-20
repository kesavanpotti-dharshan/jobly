using Jobly.Application.Features.Reminders.Commands.Create;
using Jobly.Application.Features.Reminders.Commands.Delete;
using Jobly.Application.Features.Reminders.Commands.Dismiss;
using Jobly.Application.Features.Reminders.Queries.GetReminders;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jobly.API.Controllers;

[ApiController]
[Authorize]
[Route("api/reminders")]
public class RemindersController : ControllerBase
{
    private readonly IMediator _mediator;

    public RemindersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRemindersQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateReminderCommand command,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { id });
    }

    [HttpPatch("{id:guid}/dismiss")]
    public async Task<IActionResult> Dismiss(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DismissReminderCommand(id), cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteReminderCommand(id), cancellationToken);
        return NoContent();
    }
}