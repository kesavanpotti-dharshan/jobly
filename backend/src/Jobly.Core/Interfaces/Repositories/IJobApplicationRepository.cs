using Jobly.Core.Entities;
using Jobly.Core.Enums;

namespace Jobly.Core.Interfaces.Repositories;

public interface IJobApplicationRepository : IRepository<JobApplication>
{
    Task<JobApplication?> GetByIdWithDetailsAsync(Guid id, Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<JobApplication>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<JobApplication>> GetByStatusAsync(Guid userId, ApplicationStatus status, CancellationToken cancellationToken = default);
    Task<int> GetCountByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
}