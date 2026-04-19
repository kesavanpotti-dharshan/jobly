using Jobly.Application.Common.Exceptions;
using Jobly.Application.Features.Auth.DTOs;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;

namespace Jobly.Application.Features.Auth.Commands.Refresh;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenService _tokenService;

    public RefreshTokenCommandHandler(IUnitOfWork unitOfWork, ITokenService tokenService)
    {
        _unitOfWork = unitOfWork;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> Handle(
        RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        var tokenHash = HashToken(request.RefreshToken);

        var existing = await _unitOfWork.RefreshTokens
            .GetByTokenHashAsync(tokenHash, cancellationToken)
            ?? throw new UnauthorizedException("Invalid refresh token.");

        // Token reuse detection — revoke all tokens for this user
        if (existing.IsRevoked)
        {
            await _unitOfWork.RefreshTokens
                .RevokeAllByUserIdAsync(existing.UserId, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw new UnauthorizedException("Refresh token reuse detected. Please log in again.");
        }

        if (existing.ExpiresAt < DateTime.UtcNow)
            throw new UnauthorizedException("Refresh token has expired.");

        // Rotate — revoke old, issue new
        existing.IsRevoked = true;
        _unitOfWork.RefreshTokens.Update(existing);

        var rawNewToken = _tokenService.GenerateRefreshToken();
        var newRefreshToken = new RefreshToken
        {
            UserId = existing.UserId,
            TokenHash = HashToken(rawNewToken),
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _unitOfWork.RefreshTokens.AddAsync(newRefreshToken, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var accessToken = _tokenService.GenerateAccessToken(existing.User);

        return new AuthResponseDto(
            accessToken,
            rawNewToken,
            existing.User.Email,
            existing.User.FirstName,
            existing.User.LastName);
    }

    private static string HashToken(string token)
    {
        var bytes = System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes).ToLower();
    }
}