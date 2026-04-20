using Jobly.Application.Features.Analytics.DTOs;
using MediatR;

namespace Jobly.Application.Features.Analytics.Queries.GetFunnelData;

public record GetFunnelDataQuery : IRequest<FunnelDataDto>;