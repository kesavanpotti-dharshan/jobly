using Jobly.Application.Features.Stages.DTOs;
using MediatR;

namespace Jobly.Application.Features.Stages.Queries.GetStages;

public record GetStagesQuery(Guid ApplicationId) : IRequest<List<ApplicationStageDto>>;