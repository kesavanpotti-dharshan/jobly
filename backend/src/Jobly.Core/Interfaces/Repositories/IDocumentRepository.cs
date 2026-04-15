using Jobly.Core.Entities;

namespace Jobly.Core.Interfaces.Repositories;

public interface IDocumentRepository : IRepository<Document>
{
    Task<IEnumerable<Document>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Document>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default);
}