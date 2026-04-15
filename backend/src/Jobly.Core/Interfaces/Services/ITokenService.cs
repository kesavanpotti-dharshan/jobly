using Jobly.Core.Entities;

namespace Jobly.Core.Interfaces.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    Guid GetUserIdFromToken(string token);
}