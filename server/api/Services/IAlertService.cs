using api.Dtos;

namespace api.Services;

public interface IAlertService
{
    Task<List<AlertDto>> GetAlertsAsync(bool unresolvedOnly);
    Task<bool> ResolveAlertAsync(string id);
}