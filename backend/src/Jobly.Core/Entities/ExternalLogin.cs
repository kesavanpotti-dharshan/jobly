using Jobly.Core.Common;

namespace Jobly.Core.Entities;

public class ExternalLogin : BaseEntity
{
    public Guid UserId { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string ProviderKey { get; set; } = string.Empty;
    public string? Email { get; set; }

    public User User { get; set; } = null!;
}