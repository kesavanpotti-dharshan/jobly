using Jobly.Core.Entities;

namespace Jobly.Core.Interfaces.Repositories;

public interface IReminderRepository : IRepository<Reminder>
{
    Task<IEnumerable<Reminder>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Reminder>> GetPendingRemindersAsync(DateTime upTo, CancellationToken cancellationToken = default);
}