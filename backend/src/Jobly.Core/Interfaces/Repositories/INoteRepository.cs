using Jobly.Core.Entities;

namespace Jobly.Core.Interfaces.Repositories;

public interface INoteRepository : IRepository<Note>
{
    Task<IEnumerable<Note>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default);
}