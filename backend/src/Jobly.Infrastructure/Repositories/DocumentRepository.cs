using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Jobly.Infrastructure.Repositories;

public class DocumentRepository : BaseRepository<Document>, IDocumentRepository
{
    public DocumentRepository(JoblyDbContext context) : base(context) { }

    public async Task<IEnumerable<Document>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(d => d.UserId == userId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<IEnumerable<Document>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(d => d.ApplicationId == applicationId)
            .ToListAsync(cancellationToken);
}