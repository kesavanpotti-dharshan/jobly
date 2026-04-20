using FluentValidation;

namespace Jobly.Application.Features.Stages.Commands.Update;

public class UpdateStageCommandValidator : AbstractValidator<UpdateStageCommand>
{
    public UpdateStageCommandValidator()
    {
        RuleFor(x => x.StageName)
            .NotEmpty().WithMessage("Stage name is required.")
            .MaximumLength(200);

        RuleFor(x => x.Notes)
            .MaximumLength(2000)
            .When(x => x.Notes != null);
    }
}