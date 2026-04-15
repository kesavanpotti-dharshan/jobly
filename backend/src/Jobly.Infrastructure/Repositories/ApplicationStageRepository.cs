using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Jobly.Infrastructure.Repositories;

public class ApplicationStageRepository : BaseRepository<ApplicationStage>, IApplicationStageRepository
{
    public ApplicationStageRepository(JoblyDbContext context) : base(context) { }

    public async Task<IEnumerable<ApplicationStage>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(s => s.ApplicationId == applicationId)
            .OrderBy(s => s.ScheduledAt)
            .ToListAsync(cancellationToken);
}