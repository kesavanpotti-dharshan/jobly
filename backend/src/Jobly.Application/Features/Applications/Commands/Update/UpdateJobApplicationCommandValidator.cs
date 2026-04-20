using FluentValidation;

namespace Jobly.Application.Features.Applications.Commands.Update;

public class UpdateJobApplicationCommandValidator
    : AbstractValidator<UpdateJobApplicationCommand>
{
    public UpdateJobApplicationCommandValidator()
    {
        RuleFor(x => x.CompanyName)
            .NotEmpty().WithMessage("Company name is required.")
            .MaximumLength(200);

        RuleFor(x => x.RoleTitle)
            .NotEmpty().WithMessage("Role title is required.")
            .MaximumLength(200);

        RuleFor(x => x.JobUrl)
            .MaximumLength(1000)
            .Must(url => url == null || Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage("Job URL must be a valid URL.");

        RuleFor(x => x.SalaryMin)
            .GreaterThanOrEqualTo(0).When(x => x.SalaryMin.HasValue)
            .WithMessage("Salary min must be a positive number.");

        RuleFor(x => x.SalaryMax)
            .GreaterThanOrEqualTo(x => x.SalaryMin ?? 0)
            .When(x => x.SalaryMax.HasValue)
            .WithMessage("Salary max must be greater than salary min.");

        RuleFor(x => x.Priority)
            .InclusiveBetween(0, 5)
            .WithMessage("Priority must be between 0 and 5.");
    }
}