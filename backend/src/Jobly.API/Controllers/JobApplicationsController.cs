using Jobly.Application.Features.Applications.Commands.Create;
using Jobly.Application.Features.Applications.Commands.Delete;
using Jobly.Application.Features.Applications.Commands.Update;
using Jobly.Application.Features.Applications.Queries.GetAll;
using Jobly.Application.Features.Applications.Queries.GetById;
using Jobly.Core.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jobly.API.Controllers;

[ApiController]
[Authorize]
[Route("api/applications")]
public class JobApplicationsController : ControllerBase
{
    private readonly IMediator _mediator;

    public JobApplicationsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ApplicationStatus? status,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetAllJobApplicationsQuery(status), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetJobApplicationByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateJobApplicationCommand command,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UpdateJobApplicationCommand command,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(command with { Id = id }, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteJobApplicationCommand(id), cancellationToken);
        return NoContent();
    }
}