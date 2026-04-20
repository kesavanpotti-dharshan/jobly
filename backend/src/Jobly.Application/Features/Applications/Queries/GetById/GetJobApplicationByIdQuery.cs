using Jobly.Application.Features.Applications.DTOs;
using MediatR;

namespace Jobly.Application.Features.Applications.Queries.GetById;

public record GetJobApplicationByIdQuery(Guid Id) : IRequest<JobApplicationDetailDto>;