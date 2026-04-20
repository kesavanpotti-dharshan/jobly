using FluentValidation;

namespace Jobly.Application.Features.Reminders.Commands.Create;

public class CreateReminderCommandValidator : AbstractValidator<CreateReminderCommand>
{
    public CreateReminderCommandValidator()
    {
        RuleFor(x => x.ApplicationId)
            .NotEmpty().WithMessage("Application ID is required.");

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("Message is required.")
            .MaximumLength(500);

        RuleFor(x => x.RemindAt)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("Reminder time must be in the future.");
    }
}