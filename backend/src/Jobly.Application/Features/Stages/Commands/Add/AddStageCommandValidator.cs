using FluentValidation;

namespace Jobly.Application.Features.Stages.Commands.Add;

public class AddStageCommandValidator : AbstractValidator<AddStageCommand>
{
    public AddStageCommandValidator()
    {
        RuleFor(x => x.ApplicationId)
            .NotEmpty().WithMessage("Application ID is required.");

        RuleFor(x => x.StageName)
            .NotEmpty().WithMessage("Stage name is required.")
            .MaximumLength(200);

        RuleFor(x => x.Notes)
            .MaximumLength(2000)
            .When(x => x.Notes != null);
    }
}