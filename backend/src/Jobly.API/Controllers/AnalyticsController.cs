using Jobly.Application.Features.Analytics.Queries.GetDashboardStats;
using Jobly.Application.Features.Analytics.Queries.GetFunnelData;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jobly.API.Controllers;

[ApiController]
[Authorize]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AnalyticsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardStats(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetDashboardStatsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("funnel")]
    public async Task<IActionResult> GetFunnelData(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetFunnelDataQuery(), cancellationToken);
        return Ok(result);
    }
}