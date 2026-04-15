using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Jobly.Infrastructure.Repositories;

public class NoteRepository : BaseRepository<Note>, INoteRepository
{
    public NoteRepository(JoblyDbContext context) : base(context) { }

    public async Task<IEnumerable<Note>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(n => n.ApplicationId == applicationId)
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync(cancellationToken);
}