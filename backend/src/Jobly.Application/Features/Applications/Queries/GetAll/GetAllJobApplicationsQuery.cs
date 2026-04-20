using Jobly.Application.Features.Applications.DTOs;
using Jobly.Core.Enums;
using MediatR;

namespace Jobly.Application.Features.Applications.Queries.GetAll;

public record GetAllJobApplicationsQuery(
    ApplicationStatus? Status = null
) : IRequest<List<JobApplicationDto>>;