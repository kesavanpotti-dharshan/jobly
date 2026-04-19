using Jobly.Application.Common.Exceptions;
using Jobly.Core.Interfaces.Repositories;
using MediatR;

namespace Jobly.Application.Features.Auth.Commands.VerifyEmail;

public class VerifyEmailCommandHandler : IRequestHandler<VerifyEmailCommand, bool>
{
    private readonly IUnitOfWork _unitOfWork;

    public VerifyEmailCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(
        VerifyEmailCommand request,
        CancellationToken cancellationToken)
    {
        var user = (await _unitOfWork.Users
            .FindAsync(u => u.EmailVerificationToken == request.Token, cancellationToken))
            .FirstOrDefault()
            ?? throw new NotFoundException("User", request.Token);

        if (user.EmailVerificationTokenExpiry < DateTime.UtcNow)
            throw new ValidationException(new Dictionary<string, string[]>
            {
                { "Token", ["Verification token has expired. Please request a new one."] }
            });

        user.EmailVerified = true;
        user.EmailVerificationToken = null;
        user.EmailVerificationTokenExpiry = null;

        _unitOfWork.Users.Update(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }
}