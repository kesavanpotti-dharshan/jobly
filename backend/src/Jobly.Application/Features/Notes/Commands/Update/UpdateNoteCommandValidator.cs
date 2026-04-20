using FluentValidation;

namespace Jobly.Application.Features.Notes.Commands.Update;

public class UpdateNoteCommandValidator : AbstractValidator<UpdateNoteCommand>
{
    public UpdateNoteCommandValidator()
    {
        RuleFor(x => x.Body)
            .NotEmpty().WithMessage("Note body is required.")
            .MaximumLength(5000);
    }
}