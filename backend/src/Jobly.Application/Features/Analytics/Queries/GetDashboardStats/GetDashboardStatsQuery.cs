using Jobly.Application.Features.Analytics.DTOs;
using MediatR;

namespace Jobly.Application.Features.Analytics.Queries.GetDashboardStats;

public record GetDashboardStatsQuery : IRequest<DashboardStatsDto>;