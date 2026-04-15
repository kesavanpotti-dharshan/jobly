namespace Jobly.Core.Interfaces.Repositories;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IJobApplicationRepository JobApplications { get; }
    IApplicationStageRepository ApplicationStages { get; }
    INoteRepository Notes { get; }
    IRefreshTokenRepository RefreshTokens { get; }
    IReminderRepository Reminders { get; }
    IDocumentRepository Documents { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}