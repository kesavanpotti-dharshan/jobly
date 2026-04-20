using Jobly.Application.Features.Stages.Commands.Add;
using Jobly.Application.Features.Stages.Commands.Delete;
using Jobly.Application.Features.Stages.Commands.Update;
using Jobly.Application.Features.Stages.Queries.GetStages;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jobly.API.Controllers;

[ApiController]
[Authorize]
[Route("api/applications/{applicationId:guid}/stages")]
public class StagesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public StagesController(
    IMediator mediator,
    IUnitOfWork unitOfWork,
    ICurrentUserService currentUserService)
    {
        _mediator = mediator;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetStagesQuery(applicationId), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Add(
        Guid applicationId,
        [FromBody] AddStageCommand command,
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
        [FromBody] UpdateStageCommand command,
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
            new DeleteStageCommand(id, applicationId), cancellationToken);
        return NoContent();
    }
}