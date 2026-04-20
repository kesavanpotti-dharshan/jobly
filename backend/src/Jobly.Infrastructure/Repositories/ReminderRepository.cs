using Jobly.Core.Entities;
using Jobly.Core.Interfaces.Repositories;
using Jobly.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Jobly.Infrastructure.Repositories;

public class ReminderRepository : BaseRepository<Reminder>, IReminderRepository
{
    public ReminderRepository(JoblyDbContext context) : base(context) { }

    public async Task<IEnumerable<Reminder>> GetByUserIdAsync(
    Guid userId, CancellationToken cancellationToken = default)
    => await _dbSet
        .Include(r => r.Application)
        .Where(r => r.UserId == userId && !r.IsDismissed)
        .OrderBy(r => r.RemindAt)
        .ToListAsync(cancellationToken);

    public async Task<IEnumerable<Reminder>> GetPendingRemindersAsync(DateTime upTo, CancellationToken cancellationToken = default)
        => await _dbSet
            .Include(r => r.User)
            .Include(r => r.Application)
            .Where(r => !r.IsSent && !r.IsDismissed && r.RemindAt <= upTo)
            .ToListAsync(cancellationToken);
}