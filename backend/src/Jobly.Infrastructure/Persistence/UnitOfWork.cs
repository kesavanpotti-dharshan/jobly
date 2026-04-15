using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Repositories;

namespace Jobly.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly JoblyDbContext _context;

    public IUserRepository Users { get; }
    public IJobApplicationRepository JobApplications { get; }
    public IApplicationStageRepository ApplicationStages { get; }
    public INoteRepository Notes { get; }
    public IRefreshTokenRepository RefreshTokens { get; }
    public IReminderRepository Reminders { get; }
    public IDocumentRepository Documents { get; }

    public UnitOfWork(JoblyDbContext context)
    {
        _context = context;
        Users = new UserRepository(context);
        JobApplications = new JobApplicationRepository(context);
        ApplicationStages = new ApplicationStageRepository(context);
        Notes = new NoteRepository(context);
        RefreshTokens = new RefreshTokenRepository(context);
        Reminders = new ReminderRepository(context);
        Documents = new DocumentRepository(context);
    }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => _context.SaveChangesAsync(cancellationToken);

    public void Dispose()
        => _context.Dispose();
}