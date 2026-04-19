using Jobly.Application.Features.Auth.DTOs;
using MediatR;

namespace Jobly.Application.Features.Auth.Commands.Login;

public record LoginCommand(
    string Email,
    string Password
) : IRequest<AuthResponseDto>;