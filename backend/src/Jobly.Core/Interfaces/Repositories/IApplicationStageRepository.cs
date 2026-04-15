using Jobly.Core.Entities;

namespace Jobly.Core.Interfaces.Repositories;

public interface IApplicationStageRepository : IRepository<ApplicationStage>
{
    Task<IEnumerable<ApplicationStage>> GetByApplicationIdAsync(Guid applicationId, CancellationToken cancellationToken = default);
}