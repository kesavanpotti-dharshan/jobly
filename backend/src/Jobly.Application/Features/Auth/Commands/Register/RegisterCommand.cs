using Jobly.Application.Features.Auth.DTOs;
using MediatR;

namespace Jobly.Application.Features.Auth.Commands.Register;

public record RegisterCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password
) : IRequest<AuthResponseDto>;