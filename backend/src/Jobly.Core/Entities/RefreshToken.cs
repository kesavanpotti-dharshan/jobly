using Jobly.Core.Common;

namespace Jobly.Core.Entities;

public class RefreshToken : BaseEntity
{
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = string.Empty;
    public bool IsRevoked { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string? CreatedByIp { get; set; }

    public User User { get; set; } = null!;
}