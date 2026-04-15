using Jobly.Core.Entities;
using Jobly.Core.Enums;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Jobly.Infrastructure.Repositories;

public class JobApplicationRepository : BaseRepository<JobApplication>, IJobApplicationRepository
{
    public JobApplicationRepository(JoblyDbContext context) : base(context) { }

    public async Task<JobApplication?> GetByIdWithDetailsAsync(Guid id, Guid userId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Include(a => a.Stages)
            .Include(a => a.Notes)
            .Include(a => a.Documents)
            .Include(a => a.Reminders)
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId, cancellationToken);

    public async Task<IEnumerable<JobApplication>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<IEnumerable<JobApplication>> GetByStatusAsync(Guid userId, ApplicationStatus status, CancellationToken cancellationToken = default)
        => await _dbSet
            .Where(a => a.UserId == userId && a.Status == status)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<int> GetCountByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => await _dbSet.CountAsync(a => a.UserId == userId, cancellationToken);
}