namespace Jobly.Core.Interfaces.Services;

public interface IEmailService
{
    Task SendVerificationEmailAsync(string toEmail, string firstName, string token, CancellationToken cancellationToken = default);
    Task SendReminderEmailAsync(string toEmail, string firstName, string message, CancellationToken cancellationToken = default);
    Task SendPasswordResetEmailAsync(string toEmail, string firstName, string token, CancellationToken cancellationToken = default);
}