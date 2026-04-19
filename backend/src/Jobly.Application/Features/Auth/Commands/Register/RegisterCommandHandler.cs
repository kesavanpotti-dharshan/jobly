using Jobly.Application.Common.Exceptions;
using Jobly.Application.Features.Auth.DTOs;
using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Core.Interfaces.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Jobly.Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IPasswordHasher<User> _passwordHasher;

    public RegisterCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenService tokenService,
        IEmailService emailService,
        IPasswordHasher<User> passwordHasher)
    {
        _unitOfWork = unitOfWork;
        _tokenService = tokenService;
        _emailService = emailService;
        _passwordHasher = passwordHasher;
    }

    public async Task<AuthResponseDto> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        var exists = await _unitOfWork.Users
            .ExistsByEmailAsync(request.Email.ToLower(), cancellationToken);

        if (exists)
            throw new ValidationException(new Dictionary<string, string[]>
            {
                { "Email", ["An account with this email already exists."] }
            });

        var user = new User
        {
            Email = request.Email.ToLower(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            EmailVerificationToken = Guid.NewGuid().ToString("N"),
            EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24)
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _unitOfWork.Users.AddAsync(user, cancellationToken);

        var rawRefreshToken = _tokenService.GenerateRefreshToken();
        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            TokenHash = HashToken(rawRefreshToken),
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _unitOfWork.RefreshTokens.AddAsync(refreshToken, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _emailService.SendVerificationEmailAsync(
            user.Email,
            user.FirstName,
            user.EmailVerificationToken,
            cancellationToken);

        var accessToken = _tokenService.GenerateAccessToken(user);

        return new AuthResponseDto(
            accessToken,
            rawRefreshToken,
            user.Email,
            user.FirstName,
            user.LastName);
    }

    private static string HashToken(string token)
    {
        var bytes = System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes).ToLower();
    }
}