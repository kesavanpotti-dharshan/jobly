using Jobly.Core.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Jobly.Infrastructure.Services.Email;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendVerificationEmailAsync(
        string toEmail,
        string firstName,
        string token,
        CancellationToken cancellationToken = default)
    {
        var verifyUrl = $"{_configuration["App:BaseUrl"]}/auth/verify?token={token}";
        await SendEmailAsync(
            toEmail,
            firstName,
            "Verify your Jobly account",
            $"<p>Hi {firstName},</p><p>Please verify your email: <a href='{verifyUrl}'>Verify Email</a></p>",
            cancellationToken);
    }

    public async Task SendReminderEmailAsync(
        string toEmail,
        string firstName,
        string message,
        CancellationToken cancellationToken = default)
    {
        await SendEmailAsync(
            toEmail,
            firstName,
            "Jobly reminder",
            $"<p>Hi {firstName},</p><p>{message}</p>",
            cancellationToken);
    }

    public async Task SendPasswordResetEmailAsync(
        string toEmail,
        string firstName,
        string token,
        CancellationToken cancellationToken = default)
    {
        var resetUrl = $"{_configuration["App:BaseUrl"]}/auth/reset-password?token={token}";
        await SendEmailAsync(
            toEmail,
            firstName,
            "Reset your Jobly password",
            $"<p>Hi {firstName},</p><p>Reset your password: <a href='{resetUrl}'>Reset Password</a></p>",
            cancellationToken);
    }

    private async Task SendEmailAsync(
    string toEmail,
    string toName,
    string subject,
    string htmlContent,
    CancellationToken cancellationToken)
    {
        var apiKey = _configuration["SendGrid:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey) || apiKey == "placeholder")
        {
            // Dev mode — skip sending, just log
            Console.WriteLine($"[DEV] Email to {toEmail} | Subject: {subject}");
            return;
        }

        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(
            _configuration["SendGrid:FromEmail"],
            _configuration["SendGrid:FromName"]);
        var to = new EmailAddress(toEmail, toName);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, string.Empty, htmlContent);
        await client.SendEmailAsync(msg, cancellationToken);
    }
}