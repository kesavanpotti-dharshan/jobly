using FluentValidation;

namespace Jobly.Application.Features.Notes.Commands.Add;

public class AddNoteCommandValidator : AbstractValidator<AddNoteCommand>
{
    public AddNoteCommandValidator()
    {
        RuleFor(x => x.ApplicationId)
            .NotEmpty().WithMessage("Application ID is required.");

        RuleFor(x => x.Body)
            .NotEmpty().WithMessage("Note body is required.")
            .MaximumLength(5000);
    }
}