using Jobly.Application.Features.Auth.DTOs;
using MediatR;

namespace Jobly.Application.Features.Auth.Commands.Refresh;

public record RefreshTokenCommand(string RefreshToken) : IRequest<AuthResponseDto>;